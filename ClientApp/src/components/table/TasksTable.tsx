import { Button, Theme, withStyles } from '@material-ui/core';
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


class TasksTable extends React.Component<ISmartTableProps> {

    constructor(props: ISmartTableProps) {
        super(props);
    }

    public componentDidMount() {
        const { id } = this.props.match.params;
        const { tasks } = this.props;
        console.log(`Task ID is ${id}`)
        if(tasks && !tasks.length ) {
            this.props.getTasks();
        }
    }
    
    private onRowClick = (e: React.SyntheticEvent<Table>, rowIndex: number) => {
        console.log(rowIndex);
    };

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
    };


    public render(): JSX.Element {
        const { classes, tasks } = this.props;
        const tasksList : ITask[] = tasks ?  tasks : [];
        
        return ( 
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
                        } </Cell>
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
        );
    };
}

const styles = (theme: Theme) => ({
    button: {
        marginRight: theme.spacing.unit
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
    }
});

const mapStateToProps = (state: any) => ({
    tasks: state.tasks.tasks,
    hashedTasks: hashedTasks(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        getTasks: ActionCreators.getTasks,
        removeTask: ActionCreators.removeTaskRequest,
        completeTask: ActionCreators.completeTaskRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(TasksTable as any));
