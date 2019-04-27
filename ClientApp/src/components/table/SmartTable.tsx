import { Button, Theme, withStyles } from '@material-ui/core';
import { Cell, Column, Table } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import * as React from 'react';

const rows = [
    "first row",
    "second row",
    "third row",
    "fourth row",
    "fifth row",
    "sixth row",
    "seventh row",
    "eighth row",
    "nineth row",
    "tenth row",
    // .... and more
  ];

const MyCustomCell = (props: any) =>{
  const {mySpecialProp} = props;
  return (<Cell>
    {mySpecialProp === "column2" ? "I'm column 2" : "I'm not column 2"}
    </Cell>);
  };

interface ISmartTableProps {    
    classes?: any;
    match?: any;
}


class SmartTable extends React.Component<ISmartTableProps> {

    constructor(props: ISmartTableProps) {
        super(props);
    }

    public componentDidMount() {
        const { id } = this.props.match.params;
        console.log(`Task ID is ${id}`)
    }
    
    private onRowClick = (e: React.SyntheticEvent<Table>, rowIndex: number) => {
        console.log(rowIndex);
    };

    private buttonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.target as HTMLElement;
        e.stopPropagation();
        console.log(button.id);
    };    

    public render(): JSX.Element {
        const { classes } = this.props;
        return ( 
            <Table
                rowHeight={50}
                rowsCount={rows.length}
                width={815}
                height={500}
                headerHeight={50}
                onRowClick={this.onRowClick}
                >
                <Column
                header={<Cell>Col 1</Cell>}
                cell={<Cell>Column 1 static content</Cell>}
                width={200}
                />
                <Column
                header={<Cell>Col 2</Cell>}
                cell={<MyCustomCell mySpecialProp="column2" />}
                width={200}
                />
                <Column
                header={<Cell>Col 3</Cell>}
                cell={({rowIndex, ...props}) => (
                    <Cell {...props}>
                    Data for column 3: {rows[rowIndex]}
                    </Cell>
                )}
                width={200}
                />
                <Column
                header={<Cell>Col 4</Cell>}
                cell={({rowIndex, ...props}) => (
                    <Cell {...props}>
                    <Button
                        variant="raised"
                        color="primary"
                        className={classes.button}
                        onClick={this.buttonClicked}
                        id={rowIndex.toString()}
                        >
                        Click me!
                    </Button>
                    </Cell>
                )}
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
});

export default withStyles(styles, { withTheme: true })(SmartTable as any) as any;
