import moment from 'moment';
import * as React from 'react';

const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;
const WEEK = 604800;

interface ICountDownProps {
    timeToFinish: moment.Moment;
    taskId: number;
    completeTask: (taskId: number) => void;
    isActive: boolean;
}

interface ICountDownState {
    timeLeft: number;
}

export default class CountDown extends React.Component<ICountDownProps, ICountDownState> {
    private intervalId: any = null;

    constructor(props: ICountDownProps) {
      super(props);
      this.state = {
          timeLeft: this.props.isActive? 60 : 0,
        }
    }

    private timer () {
        const {timeToFinish, isActive} = this.props;
        const now = moment();
        const timeLeft = timeToFinish.diff(now, 'seconds');
        if(!isActive) {
            this.setState({
                timeLeft: 0,
            });
            clearInterval(this.intervalId);
        }
        if(timeLeft >= 1) {
            this.setState({
                timeLeft,
            })
        }
        
        if(timeLeft < 1) {
            this.setState({
                timeLeft: 0,
            });
            clearInterval(this.intervalId);
            this.props.completeTask(this.props.taskId);
        }
        
    }

    public componentDidMount() {
        if(this.props.isActive) {
            this.intervalId = setInterval(this.timer.bind(this), 1000);
        }
    }
    
    public componentWillUnmount() {
        if(this.props.isActive) {
            clearInterval(this.intervalId);
        }
    }
    

    private processSeconds = () => {
        let { timeLeft } = this.state;
        const weeks = Math.floor(timeLeft / WEEK);
        let time = '';
        if(weeks > 0) {
            time = time + `${weeks} weeks `;
            timeLeft = timeLeft - weeks * WEEK;
        }
        const days = Math.floor(timeLeft / DAY);
        if(days > 0) {
            time = time + `${days} days `;
            timeLeft = timeLeft - days * DAY;
        }
        const hours = Math.floor( timeLeft / HOUR);
        if(hours > 0) {
            time = time + `${hours} hours `;
            timeLeft = timeLeft - hours * HOUR;
        }
        const minutes = Math.floor(timeLeft / MINUTE);
        if(minutes > 0) {
            time = time + `${minutes} minutes `;
            timeLeft = timeLeft - minutes * MINUTE;
        }
        time = time + `${timeLeft} seconds`;
        return (<span>{time}</span>);
    }

    public render() {
      return(
        <div>{this.processSeconds()}</div>
      );
    }
  }

