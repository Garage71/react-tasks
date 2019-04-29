import { Button, Grid, Paper, Theme, Typography, withStyles } from '@material-ui/core';
import { Cell, Column, Table } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch} from 'redux';
import * as ActionCreators from 'src/redux-infrastucture/actions/actions';
import hashedTasks from 'src/redux-infrastucture/selectors/selectors';
import { ITask } from 'src/redux-infrastucture/store/tasksState';
import CountDown from './CountDown';

interface ISmartTableProps {
  classes?: any;
  match?: any;
  getTasks: () => void;
  tasks?: ITask[];
  hashedTasks?: object;
  completeTask: (taskId: number) => void;
  removeTask: (taskId: number) => void;
}

interface ISmartTableState {
  selectedTask: ITask | null;
  filteredTasks: ITask[] | null;
}

class TasksTable extends React.Component<ISmartTableProps, ISmartTableState> {
  constructor(props: ISmartTableProps) {
    super(props);
      this.state = {
        selectedTask: null,
        filteredTasks: null,
    };
  }

  public componentDidMount() {
    const { id } = this.props.match.params;
    const { tasks } = this.props;
    console.log(`Task ID is ${id}`);
    if(tasks && !tasks.length ) {
        this.props.getTasks();
    }
  }
    
  private onRowClick = (e: React.SyntheticEvent<Table>, rowIndex: number) => {
    const { tasks } = this.props;
    const { filteredTasks } = this.state;
    const propsTasks = tasks as ITask[];
    const task = filteredTasks ? filteredTasks[rowIndex] : propsTasks[rowIndex];
    this.setState({
      selectedTask: task,
    });
  }

  private actionClicked = (index: number) => {
    console.log(index);
    const {selectedTask} = this.state;
    const { tasks } = this.props;
    if(tasks) {
      const task: ITask = tasks[index];
      if(task.isActive) {
        this.props.completeTask(task.taskId);
        if(selectedTask && selectedTask.taskId === task.taskId) {
          this.setState({
            selectedTask: {
              ...selectedTask,
              isActive: false,
            },
          });
        }
      } else {
        this.props.removeTask(task.taskId);
        this.setState({
          selectedTask: null,
        });
      }
    }
  }

    public render(): JSX.Element {
      const { classes, tasks } = this.props;
      const { filteredTasks, selectedTask } = this.state;
      const tasksList : ITask[] = filteredTasks ? filteredTasks : (tasks ? tasks : []);
        
      return (
        <Paper className={classes.container}>
          <Typography
            variant={'h4'}
            className={classes.tabel}
          >
            Task list
          </Typography>
          <br/>
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
                      completeTask={this.props.completeTask}
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
              header={<Cell className={classes.actionButton}>Actions</Cell>}
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
          {selectedTask &&
            <Paper className={classes.taskDetailsContainer}>
              <Typography variant={'h5'} className={classes.taskDetailsHeader}>
                Task Details
              </Typography>
              <Grid container={true} spacing={16}>
                <Grid item={true} xs={2}>
                  <span className={classes.taskLabel}>Name</span>
                </Grid>
                <Grid item={true} xs={10}>
                  {selectedTask.name}
                </Grid>
                <Grid item={true} xs={2}>
                  <span className={classes.taskLabel}>Description</span>
                </Grid>
                <Grid item={true} xs={10}>
                  <div dangerouslySetInnerHTML={{__html: selectedTask.description}} />
                </Grid>
                <Grid item={true} xs={2}>
                  <span className={classes.taskLabel}>Status</span>
                </Grid>
                <Grid item={true} xs={10}>
                  {selectedTask.isActive ? 'Active' : 'Completed'}
                </Grid>
                <Grid item={true} xs={2}>
                  <span className={classes.taskLabel}>Priority</span>
                </Grid>
                <Grid item={true} xs={10}>
                  {selectedTask.priority}
                </Grid>
                <Grid item={true} xs={2}>
                  <span className={classes.taskLabel}>Added</span>
                </Grid>
                <Grid item={true} xs={10}>
                  {moment(selectedTask.addedOn).format('YYYY-MM-DD HH:mm:ss')}
                </Grid>
              </Grid>
            </Paper>
          }
        </Paper>
      );
    }
}

const styles = (theme: Theme) => ({
  button: {
    marginRight: theme.spacing.unit,
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
});

const mapStateToProps = (state: any) => ({
  tasks: state.tasks.tasks,
  hashedTasks: hashedTasks(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    getTasks: ActionCreators.getTasks,
        removeTask: ActionCreators.removeTaskRequest,
        completeTask: ActionCreators.completeTaskRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(TasksTable as any));
