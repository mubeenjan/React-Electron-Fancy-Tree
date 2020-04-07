import $ from 'jquery';
import 'jquery-ui';
import 'jquery.fancytree/dist/skin-lion/ui.fancytree.less';  // CSS or LESS
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import 'jquery.fancytree/dist/modules/jquery.fancytree';
import 'jquery.fancytree/dist/modules/jquery.fancytree.dnd';
// import './vendor/jquery.fancytree/jquery.fancytree.edit';
import React from 'react';
import ReactDOM from 'react-dom';
// import Component from 'react-es6-component';
import ContextMenuExtension from './ContextMenuExtension';

export default class TreeView extends React.Component {

  static propTypes = {
    // nodes: React.PropTypes.array.isRequired,

    // onDoubleClick: React.PropTypes.func,
    // onSelected: React.PropTypes.func,
    // onRename: React.PropTypes.func,
    // style: React.PropTypes.object,
    // onContextMenuClick: React.PropTypes.func,
    // selectedID: React.PropTypes.string,

    // onDragStart: React.PropTypes.func,
    // onDragEnter: React.PropTypes.func,
    // onDragDrop: React.PropTypes.func,

  };

  static defaultProps = {
    onDoubleClick: function () { },
    onRename: function () { },
    onSelected: function () { },
    onContextMenuClick: function (event, node) {
      console.log("Clicked Node", node);
    },
    onDragStart: function (node, data) {
      return false;
    },
    onDragEnter: function (node, data) {
      return false;
    },
    onDragDrop: function (node, data) {
      return false;
    }
  };

  state = {
    treeDate: []
  }

  render() {
    return (
      <div style={this.props.style} className="tree-view">
        <div className="fancytree"></div>
        {this.props.children}
      </div>
    );
  }

  generateTree = (root) => {
    const $node = $(ReactDOM.findDOMNode(root));
    const $tree = $node.find('.fancytree');
    $tree.fancytree({
      toggleEffect: false,
      extensions: ["edit", "dnd"],
      source: this.state.treeDate,
      contextMenu: { onClick: this.props.onContextMenuClick },
      activate: () => {
        const tree = $tree.fancytree('getTree');
        this.props.onSelected(tree.getActiveNode());
      },
      edit: {
        beforeClose: (event, data) => {
          if (data.save) {
            this.props.onRename(data.node, data.input.val());
          }
        }
      },
      dblclick: () => {
        const node = $tree.fancytree('getTree').getActiveNode();
        this.props.onDoubleClick(node);
      },
      // dnd: {
      //   autoExpandMS: 400,
      //   focusOnClick: true,
      //   preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
      //   preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
      //   dragStart: this.props.onDragStart,
      //   dragEnter: this.props.onDragEnter,
      //   dragDrop: this.props.onDragDrop
      // }
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.selectedID !== nextProps.selectedID) {
  //     this.selectByID(nextProps.selectedID);
  //   }
  //   // console.log(nextProps.nodes)
  //   this.setState({ treeDate: nextProps.nodes }, () => {
  //     console.log("state", this.state.treeDate)
  //   })

  // }

  static getDerivedStateFromProps(props, state) {
    return {
      treeDate: props.nodes ? props.nodes : []
    }
  }
  componentDidMount() {
    this.generateTree(this)
  }
  componentDidUpdate() {
    const $node = $(ReactDOM.findDOMNode(this));
    const $tree = $node.find('.fancytree');
    $tree.fancytree('destroy');
    this.generateTree(this)
  }
  componentWillUnmount() {
    const $node = $(ReactDOM.findDOMNode(this));
    const $tree = $node.find('.fancytree');
    $tree.fancytree('destroy');
  }

  getTree() {
    const $node = $(ReactDOM.findDOMNode(this));
    const $tree = $node.find('.fancytree');
    return $tree.fancytree('getTree');
  }

  selectByID(id) {
    if (!id) {
      return;
    }
    const tree = this.getTree();
    this.deselectAll();
    function select(node) {
      if (node.data && node.data.id && node.data.id === id) {
        node.setSelected(true);
      } else {
        const children = node.getChildren();
        if (children) {
          for (let child of children) {
            select(child);
          }
        }
      }
    }
    select(tree.rootNode);
  }

  deselectAll() {
    const tree = this.getTree();
    function deselectChildren(children) {
      if (!children) {
        return;
      }
      for (let node of children) {
        node.setActive(false);
        node.setSelected(false);
        deselectChildren(node.getChildren());
      }
    }
    deselectChildren(tree.rootNode.getChildren());
  }

}
