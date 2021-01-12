import React from 'react';
import {
    Badge,
    Button,
    Card,
    CardHeader, DropdownItem, DropdownMenu, DropdownToggle,
    Media,
    Progress,
    Row,
    Table,
    UncontrolledDropdown,
} from "reactstrap";
import JsxParser from "react-jsx-parser";
import AvatarGroup from "../Groups/AvatarGroup";

class TableCard extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            dark: this.props.dark
        }
    }


    getCols() {
        return this.props.cols.map(col => {
            return (
                <th key={col} scope="col">{col}</th>
            )
        })
    }

    getRows() {
        return this.props.rows.map(row => {
            return (
                <tr key={row.id} >
                    <th scope="row" onClick={(e) => this.props.openModal(e, row.id)} style={{maxWidth: (row.image) ?'200px': '180px', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {(row.image && this.props.with_images) ?
                            <Media className="align-items-center" style={{display:'contents'}}>
                                <a className="avatar avatar-xsm rounded-circle mr-3" style={{display:'inline-table'}} onClick={e => e.preventDefault()}>
                                    <img alt={row.title} src={process.env.PUBLIC_URL + `/task_images/${row.image}`} />
                                </a>
                                <Media style={{display:'inline'}}>
                                    <span className="mb-0 text-sm">
                                      {row.title}
                                    </span>
                                </Media>
                            </Media>
                        : row.title}
                    </th>
                    {this.getRowContent(row.contents)}
                </tr>
            )
        })
    }

    getRowContent(row){
        return row.map((col, key) => {
            switch (col.type){
                case "custom_element":
                    return (
                        <td key={key}>
                            <JsxParser renderInWrapper={false} jsx={col.customElement} />
                            {" "}
                            {this.value(col)}
                        </td>
                    );
                case "arrow":
                    return (
                        <td key={key}>
                            <i className={`fas ${col.arrow.up ? 'fa-arrow-up text-success' : 'fa-arrow-down text-danger' } mr-1`} />
                            {" "}
                            {this.value(col)}
                        </td>
                    );
                case "badge":
                    return (
                        <td key={key}>
                            <Badge color="" className="badge-dot mr-4">
                                <i className={col.class} />
                                {this.value(col)}
                            </Badge>
                        </td>
                    );
                case "avatar-group":
                    return (
                        <td key={key}>
                            <AvatarGroup task_id={col.task_id + ""} />
                        </td>
                    );
                case "progress":
                    return (
                        <td  key={key}>
                            <div className="d-flex align-items-center">
                                <span className="mr-2">{this.value(col)}</span>
                                <div>
                                    <Progress
                                        max="100"
                                        value={col.value}
                                        barClassName={col.class}
                                    />
                                </div>
                            </div>
                        </td>
                    );
                case "buttons":
                    return (
                        <td className="text-right"  key={key}>
                            <UncontrolledDropdown>
                                <DropdownToggle
                                    className="btn-icon-only text-light"
                                    href="#pablo"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={e => e.preventDefault()}
                                >
                                    <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                    {this.getActions(col.actions)}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </td>
                    )
                default:
                    return (
                        <td key={key}>
                            {this.value(col)}
                        </td>
                    );
            }

        });
    }

    getActions(actions) {
        return actions.map ((action, key) => {
            return (
                <DropdownItem
                    href="#pablo"
                    key={key}
                    onClick={e => e.preventDefault()}
                >
                    {action.title}
                </DropdownItem>
            )
        })
    }

    value(col) {
        return (
            <>
                {col.money && "$"}
                {!col.custom_contains_value && col.value}
                {col.percentage && "%"}
            </>
        )
    }

    toggleTheme= (e) =>{
        e.preventDefault();
        localStorage.setItem("dark", (!this.state.dark).toString());
        this.setState({dark: !this.state.dark})
    }

    render() {
        return (
            <Card className={`${this.state.dark && 'bg-default'} shadow`}>
                <CardHeader className={`${this.state.dark && 'bg-transparent'} border-0`}>
                    <Row className="align-items-center">
                        <div className="col">
                            <h3 className={`${this.state.dark && 'text-white'} mb-0`}>{this.props.title}</h3>
                        </div>
                        <div className="col text-right">
                            <Button
                                color="primary"
                                onClick={this.toggleTheme}
                                size="sm"
                            >
                                <i className={`fa ${this.state.dark ? 'fa-sun' : 'fa-moon'}`}/>
                            </Button>
                            <Button
                                color="primary"
                                onClick={this.props.top_callback}
                                size="sm"
                            >
                                {this.props.top_button}
                            </Button>
                        </div>
                    </Row>
                </CardHeader>
                <Table className={`${this.state.dark && 'table-dark'} align-items-center table-flush`} responsive>
                    <thead className={`${this.state.dark ? 'thead-dark' : 'thead-light'}`}>
                        <tr>
                            {this.getCols()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.getRows()}
                    </tbody>
                </Table>
            </Card>
        )
    }
}

export default TableCard;