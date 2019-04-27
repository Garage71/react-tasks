import { Button, FormControl, Input, InputLabel, Paper, Theme, withStyles } from '@material-ui/core';
import { DateTimePicker } from 'material-ui-pickers';
// import * as Moment from 'moment';
import * as React from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';
import { ITask } from '../../redux-infrastucture/store/tasksState';


interface IMyEditorProps {
  onChange: (value: string) => any;
  classes?: any;
  email: string;
  password: string;
}


interface IMyEditorState {
  value: EditorValue;
  task: ITask;
}

export class MyEditor extends React.Component<IMyEditorProps, IMyEditorState> {
  
  constructor(props: IMyEditorProps) {
    super(props);
    const now = new Date();
    const finishDate = new Date(now);
    finishDate.setMinutes(now.getMinutes() + 1);
    this.state = { 
      value: RichTextEditor.createEmptyValue(),
      task: {
        addedOn: now,
        taskId: 0,
        dateTimeToComplete: finishDate,
        isActive: true,
        description: '',
        priority: 100,
        name: '',
      }
    };
  }

  private handleEmailAddressChange = (event: any) => {
    //    
  }

  private handlePasswordChange = (event: any) => {
    // this.setState({ password: event.target.value })
  }

  private handleLogin = () => {
    // this.props.login(this.state);
  }

  private handleTimeChanged = (event: any) => {
    const { task } = this.state;
    this.setState({
      task: {
        ...task,
        dateTimeToComplete: event.target.value,
      }
    });
  }
  
  public render () {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
                <Paper className={classes.paper}>
                    <h2>{'Add new task'}</h2>
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel >Name</InputLabel>
                        <Input
                            value={this.state.task.name}
                            onChange={this.handleEmailAddressChange}
                            id="name"
                        />
                    </FormControl>
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel >Piority</InputLabel>
                        <Input
                            value={this.state.task.priority}
                            type={'number'}
                            onChange={this.handlePasswordChange}
                            id="priority"
                        />
                    </FormControl>
                    <div className={classes.picker}>
                        <br/>
                        <InputLabel>End date*</InputLabel>
                        <DateTimePicker value={this.state.task.dateTimeToComplete} onChange={this.handleTimeChanged} />
                        {/*
                        <Input
                            type={'datetime-local'}
                            value={Moment(this.state.task.dateTimeToComplete).format('YYYY-MM-DDTHH:MM:SS')}
                            onChange={this.handleTimeChanged}
                            id="endDate"
                        />
                        */}
                        
                    </div>
                    
                    <div>
                      <br/>
                      <InputLabel>Description</InputLabel>
                      <RichTextEditor
                        className={classes.RichTextEditor}
                        value={this.state.value}
                        onChange={this.onChange}
                        placeholder={'Enter description'}
                      />
                    </div>
                    <div className={classes.actions}>
                        <Button
                            onClick={this.handleLogin}
                            variant="contained"
                            color="primary"
                            className={classes.button}>
                            Submit
                        </Button>
                    </div>
                </Paper>
            </div>
    );
  }

  private onChange = (value: EditorValue) => {
    this.setState({value});
    const html = value.toString('html');
    console.log(html);
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        html
      );
    }
  };
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
      marginTop: theme.spacing.unit * 3
  },
  actions: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center'
  }),
  button: {
      marginRight: theme.spacing.unit
  },
  RichTextEditor: {
    height: 300,
  },
  picker: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0
  },
});

export default withStyles(styles, { withTheme: true })(MyEditor as any) as any;