import { Button, FormControl, IconButton, Input, InputLabel, Paper, Snackbar, Theme, withStyles } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { DateTimePicker } from 'material-ui-pickers';
import moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import RichTextEditor, { EditorValue } from 'react-rte';
import { bindActionCreators, Dispatch} from 'redux';
import * as ActionCreators from 'src/redux-infrastucture/actions/actions';
import { ITask } from 'src/redux-infrastucture/store/tasksState';

interface IAddNewTaskProps {
  submit: (task: ITask) => void;
  classes?: any;
}

interface IAddNewTaskState {
  editorValue: EditorValue;
  task: ITask;
  canSubmit: boolean;
  popSnackbar: boolean;
}

export class AddNewTask extends React.Component<IAddNewTaskProps, IAddNewTaskState> {  

  private now = new Date();

  constructor(props: IAddNewTaskProps) {
    super(props);
    const finishDate = this.getFinishTime(this.now);
    this.state = {
      editorValue: RichTextEditor.createEmptyValue(),
      task: {
          addedOn: this.now,
          taskId: 0,
          dateTimeToComplete: finishDate,
          isActive: true,
          description: '',
          priority: 100,
          name: 'New task',
      },
      canSubmit: true,
      popSnackbar: false,
    };
    this.setExpiration();
  }

  private getFinishTime = (dateTime: Date) : Date => {
    const finishDate = new Date(dateTime);
    finishDate.setMinutes(dateTime.getMinutes() + 1);
    return finishDate;
  }

  private setExpiration = () => {
    setTimeout(() => {
      if(this.state.task.dateTimeToComplete < new Date()) {
          this.setState({
            canSubmit: false,
          });
      }
    }, 61000);
  }

  private handleNameChanged = (event: any) => {
    const { value } = event.target;
    const { task } = this.state;
    this.setState({
      task: {
        ...task,
        name: value,
      },
    });
    this.setState({
      canSubmit: !!value,
    });
  }

  private handlePriorityChanged = (event: any) => {
    const { value } = event.target;
    if (!value) {
      this.setState({
        canSubmit: false,
      });
    }
    const { task } = this.state;
    this.setState({
      task: {
        ...task,
        priority: value,
      },
      canSubmit: true,
    });
  }

  private handleSubmit = () => {
    const { task } = this.state;
    const addedOn = moment(task.addedOn).format("YYYY-MM-DDTHH:mm:ss");
    const dateTimeToComplete = moment(task.dateTimeToComplete).format("YYYY-MM-DDTHH:mm:ss");
    const payload = {...task, addedOn, dateTimeToComplete};
    
    this.props.submit(payload);
    this.setState({
      popSnackbar: true,
    });
  }

  private handleTimeChanged = (pickedDate: any) => {
    const { task } = this.state;
    const date = pickedDate.toDate();
    if(date < new Date()) {
      this.setState({
        canSubmit: false,
      });
      return;
    }

    this.setState({
      task: {
        ...task,
        dateTimeToComplete: date,
      },
      canSubmit: true,
    });
  }

  private onDescriptionChanged = (value: EditorValue) => {
    const { task } = this.state;
    this.setState({editorValue: value});
    const html = value.toString('html');
    this.setState({
      task: {
        ...task,
        description: html,
      },
    });
  }

  private closeSnackbar  = () => {
    this.setState({
      popSnackbar: false,
    });
  }
  
  public render () {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <h2>{'Add new task'}</h2>
          <FormControl 
            required={true} fullWidth={true} className={classes.field}>
              <InputLabel>Task Name</InputLabel>
              <Input
                required={true}
                placeholder={'Enter task name'}
                value={this.state.task.name}
                onChange={this.handleNameChanged}
                id="name"
              />
            </FormControl>
            <FormControl required={true} fullWidth={true} className={classes.field}>
              <InputLabel>Piority</InputLabel>
              <Input
                value={this.state.task.priority}
                type={'number'}
                onChange={this.handlePriorityChanged}
                id="priority"
              />
            </FormControl>
            <div className={classes.picker}>
              <br/>
              <InputLabel>End date*</InputLabel>
              <DateTimePicker 
                value={this.state.task.dateTimeToComplete}
                onChange={this.handleTimeChanged}
                format={"DD-MM-YYYY HH:mm"}
                minDate={this.now}
                minDateMessage={"Finish date cannot be set in past"}
              />
            </div>
            <div>
              <br/>
              <InputLabel>Description</InputLabel>
              <RichTextEditor
                className={classes.RichTextEditor}
                value={this.state.editorValue}
                onChange={this.onDescriptionChanged}
                placeholder={'Enter description'}
                autoFocus={true}
              />
            </div>
            <div className={classes.actions}>
              <Button
                onClick={this.handleSubmit}
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={!this.state.canSubmit}>
                Add new task
              </Button>
            </div>
          </Paper>
          <Snackbar
              key={new Date().getTime()}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.popSnackbar}
              autoHideDuration={6000}
              onClose={this.closeSnackbar}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={
                <span id="message-id">{`Task '${this.state.task.name}' is created successfully`}</span>
              }
              action={
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.closeSnackbar}
                >
                  <Close />
                </IconButton>
              }
          />      
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'left',
    minHeight: 500,
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: '30%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'left',
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
  }),
  field: {
    marginTop: theme.spacing.unit * 3,
  },
  actions: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 0,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  RichTextEditor: {
    height: 300,
  },
  picker: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 16,
  },
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    submit: ActionCreators.addNewTaskRequest,
  }, dispatch);

export default connect(null, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(AddNewTask as any));