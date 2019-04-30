import { Button, Theme, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch} from 'redux';
import * as ActionCreators from 'src/redux-infrastucture/actions/actions';
import { Filter } from 'src/redux-infrastucture/store/tasksState';
import { __makeTemplateObject } from 'tslib';

interface IFiltersProps {
	filter: Filter;
	setFilter: (filter: Filter) => void;
	classes: any;
}

class Filters extends React.Component<IFiltersProps> {
	constructor(props: IFiltersProps){
		super(props);
	}

	private filterClicked = (filter: Filter) => {
		if(filter !== this.props.filter) {
			this.props.setFilter(filter);
		}
	}

	public render() {
		const { classes, filter } = this.props;
		
		return (
			<div className={classes.container}>
				<Button 
					variant="raised"
					color={filter === Filter.All ? "primary" : "default"}
					id={Filter.All.toString()}
					onClick={() => this.filterClicked(Filter.All)}
				>
					All
				</Button>
				<Button 
					variant="raised"
					color={filter === Filter.Active ? "primary" : "default"}
					id={Filter.Active.toString()}
					onClick={() => this.filterClicked(Filter.Active)}
				>
					Active
				</Button>
				<Button 
					variant="raised"
					color={filter === Filter.Completed ? "primary" : "default"}
					id={Filter.Completed.toString()}
					onClick={() => this.filterClicked(Filter.Completed)}
				>
					Completed
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	filter: state.tasks.filter,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    setFilter: ActionCreators.setFilter,        
}, dispatch);

const styles = (theme: Theme) => ({
  container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'left',
		marginBottom: 15,
		width: 400,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(Filters as any));