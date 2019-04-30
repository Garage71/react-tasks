import { Button, Grid, IconButton, Paper, Snackbar, Theme, Typography, withStyles } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { Cell, Column, Table } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch} from 'redux';
import * as ActionCreators from 'src/redux-infrastucture/actions/actions';
import { filteredTasks, hashMap, selectedTask } from 'src/redux-infrastucture/selectors/selectors';
import { ITask } from 'src/redux-infrastucture/store/tasksState';
import CountDown from './CountDown';
import Filters from './Filters';

interface ISmartTableProps {
  classes?: any;
  match?: any;
  getTasks: () => void;
  tasks?: ITask[];
  hashedTasks?: object;
  completeTask: (taskId: number) => void;
  removeTask: (taskId: number) => void;
  setSelectedTaskId: (taskId: number) => void;
  history?: any;
  selectedTaskId: number | null;
  choosenTask: ITask | null;
}

interface ISmartTableState {  
  selectedtaskIsFound: boolean;
  snackbarShown: boolean;
}

class TasksTable extends React.Component<ISmartTableProps, ISmartTableState> {
  constructor(props: ISmartTableProps) {
    super(props);
      this.state = {        
        selectedtaskIsFound: true,
        snackbarShown: false,
    };
  }

  public static getDerivedStateFromProps(nextProps: ISmartTableProps, prevState: ISmartTableState) : ISmartTableState {
    
    const { selectedTaskId, hashedTasks } = nextProps;
    const { snackbarShown } = prevState;

    if(selectedTaskId && 
        !snackbarShown &&          
        hashedTasks && 
        Object.keys(hashedTasks).length > 0 && 
        !hashedTasks[selectedTaskId]) {
      return {
        ...prevState,
        selectedtaskIsFound: false,
      };
    }
    return prevState;
  }

  public componentDidMount() {
    const { id } = this.props.match.params;
    const { tasks } = this.props;
    this.props.setSelectedTaskId(id);
    if(tasks && !tasks.length ) {
        this.props.getTasks();
    }
  }
    
  private onRowClick = (e: React.SyntheticEvent<Table>, rowIndex: number) => {
    const { history, tasks } = this.props;    
    const propsTasks = tasks as ITask[];
    const task =  propsTasks[rowIndex];
    
    this.props.setSelectedTaskId(task.taskId);

    if(history) {
      history.push(`/${task.taskId}`);
    }
  }
  
  private actionClicked = (index: number) => {
    console.log(index);
    const { tasks } = this.props;
    if(tasks) {
      const task: ITask = tasks[index];
      if(task.isActive) {
        this.props.completeTask(task.taskId);
      } else {
        this.props.removeTask(task.taskId);
      }
    }
  }

  private closeSnackbar = () => {
    this.setState({
      snackbarShown: true,
    });
  }

  private refreshClicked = () => {
    this.props.getTasks();
  }

  public render(): JSX.Element {
    const { choosenTask, classes, tasks, selectedTaskId } = this.props;
    const { selectedtaskIsFound, snackbarShown } = this.state;
    const tasksList : ITask[] =  tasks ? tasks : [];
      
    return (
      <Paper className={classes.container}>
        <Typography
          variant={'h4'}
          className={classes.tabel}
        >
          Task list
        </Typography>
        <br/>
        <div className={classes.filtersContainer}>
          <Filters/>
          <div className={classes.refreshButtonContainer}>
            <Button 
              variant={'raised'}
              className={classes.refreshButton}
              onClick={this.refreshClicked}
            >
              Refresh
            </Button>
          </div>
        </div>
        <Table
          rowHeight={50}
          rowsCount={tasksList.length}
          width={1086}
          height={500}
          headerHeight={50}
          onRowClick={this.onRowClick}
        >
          <Column
            header={<Cell>Name</Cell>}
            cell={({rowIndex, ...props}) => (
              <Cell {...props} className={classes.clickable}>
                {tasksList[rowIndex].name}
                  </Cell>
              )}
            width={400}
          />
          <Column
            header={<Cell>Priority</Cell>}
            cell={({rowIndex, ...props}) => (
              <Cell {...props} className={classes.priority}> {tasksList[rowIndex].priority} </Cell>
            )}
            width={70}
          />
          <Column
            header={<Cell>Added</Cell>}
            cell={({rowIndex, ...props}) => (
              <Cell {...props} className={classes.clickable}> {
                  moment(tasksList[rowIndex].addedOn).format('YYYY-MM-DD HH:mm:ss')
                }
              </Cell>
            )}
            width={200}
          />
          <Column
            header={<Cell>Time to complete</Cell>}
            cell={({rowIndex, ...props}) => (
              <Cell {...props} className={classes.clickable}>
                {tasksList[rowIndex].isActive ? 
                  <CountDown
                    completeTaskAction={this.props.completeTask}
                    taskId={tasksList[rowIndex].taskId}
                    timeToFinish={moment(tasksList[rowIndex].dateTimeToComplete)}
                    isActive={tasksList[rowIndex].isActive}
                  />
                :
                <span>Completed</span>}
              </Cell>
            )}
            width={200}
          />
          <Column
            header={
              <Cell className={classes.actionButton}>
                Actions
              </Cell>
            }
            cell={({rowIndex, ...props}) => {
              const task = tasksList[rowIndex];
              return(
                <Cell {...props} className={classes.actionButton}>
                  <Button
                    variant="contained"
                    color={task.isActive ? "primary" : "secondary"}
                    className={classes.button}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      this.actionClicked(rowIndex);}}
                      id={rowIndex.toString()}
                  >
                    {task.isActive ? 'Complete' : 'Remove'}
                  </Button>
                </Cell>);
            }}
            width={200}
          />
        </Table>
        {choosenTask &&
          <Paper className={classes.taskDetailsContainer}>
            <Typography variant={'h5'} className={classes.taskDetailsHeader}>
              Task Details
            </Typography>
            <Grid container={true} spacing={16}>
              <Grid item={true} xs={2}>
                <span className={classes.taskLabel}>Name</span>
              </Grid>
              <Grid item={true} xs={10}>
                {choosenTask.name}
              </Grid>
              <Grid item={true} xs={2}>
                <span className={classes.taskLabel}>Description</span>
              </Grid>
              <Grid item={true} xs={10}>
                <div dangerouslySetInnerHTML={{__html: choosenTask.description}} />
              </Grid>
              <Grid item={true} xs={2}>
                <span className={classes.taskLabel}>Status</span>
              </Grid>
              <Grid item={true} xs={10}>
                {choosenTask.isActive ? 'Active' : 'Completed'}
              </Grid>
              <Grid item={true} xs={2}>
                <span className={classes.taskLabel}>Priority</span>
              </Grid>
              <Grid item={true} xs={10}>
                {choosenTask.priority}
              </Grid>
              <Grid item={true} xs={2}>
                <span className={classes.taskLabel}>Added</span>
              </Grid>
              <Grid item={true} xs={10}>
                {moment(choosenTask.addedOn).format('YYYY-MM-DD HH:mm:ss')}
              </Grid>
            </Grid>
          </Paper>
        }
        <Snackbar
            key={new Date().getTime()}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={!!selectedTaskId && !selectedtaskIsFound && !snackbarShown}
            autoHideDuration={6000}
            onClose={this.closeSnackbar}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={
              <span id="message-id">{`Task ID '${this.props.selectedTaskId}' is not found`}</span>
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
      </Paper>
    );
  }
}

const styles = (theme: Theme) => ({
  button: {
    marginRight: theme.spacing.unit,
    width: 118,
  },
  priority: {
    textAlign: 'right',
    cursor: 'pointer',
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'center',
  },
  clickable: {
    cursor: 'pointer',
  },
  container: {
    paddingLeft: 40,
    paddingTop: 20,
    paddingBottom: 40,
    width: 1166,
  },
  label: {
    marginBottom: 20,
  },
  taskDetailsContainer: {
    width: 1086,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  taskDetailsHeader: {
    marginLeft: 20,
    marginBottom: 20,
  },
  taskLabel: {
    marginLeft: 20,
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
    width: 1086,
  },
  refreshButtonContainer: {
    marginBottom: 15,
  },
});

const mapStateToProps = (state: any) => ({
  tasks: filteredTasks(state),
  hashedTasks: hashMap(state),
  selectedTaskId: state.tasks.selectedTaskId,
  choosenTask: selectedTask(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    getTasks: ActionCreators.getTasks,
      removeTask: ActionCreators.removeTaskRequest,
      completeTask: ActionCreators.completeTaskRequest,
      setSelectedTaskId: ActionCreators.setSelectedTaskId,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(TasksTable as any));
