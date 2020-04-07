import TreeView from './TreeView';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class App extends React.Component {
    state = {
        nodes: [
            {
                title: "AUS",
                folder: true,
                expanded: true,
                children: [
                    { title: "Aust" },
                    { title: "Austr" },
                    { title: "Austra" },
                    { title: "Austria" },
                    { title: "Australia" },
                    { title: "America" },
                    { title: "UK" },
                    { title: "France" },
                    { title: "UAE" },
                    { title: "China" },
                    { title: "Japan" },

                ]
            }]
    }
    onchange = (e) => {
        e.preventDefault();

        if (e.target.value.trim() !== 'Select Option') {

            let filteredData = this.state.nodes[0].children.filter((data) => {
                if (data.title.startsWith(e.target.value)) {
                    return data
                }
            })
            this.setState({
                nodes: [
                    {
                        title: "AUS",
                        folder: true,
                        expanded: true,
                        children: filteredData
                    }
                ]
            })
        }
        else {
            this.setState({
                nodes: [
                    {
                        title: "AUS",
                        folder: true,
                        expanded: true,
                        children: [
                            { title: "Aust" },
                            { title: "Austr" },
                            { title: "Austra" },
                            { title: "Austria" },
                            { title: "Australia" },
                            { title: "America" },
                            { title: "UK" },
                            { title: "France" },
                            { title: "UAE" },
                            { title: "China" },
                            { title: "Japan" },

                        ]
                    }]
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                <p className="text-center">
                    <span className="cutom-btn">Fancy Tree View</span>
                </p>
                <label>Filter Tree View</label>  <select className="mb" onChange={this.onchange} >
                    <option> Select Option </option>
                    <option value="Aus">Aus</option>
                </select>
                <TreeView nodes={this.state.nodes} />
            </React.Fragment>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));