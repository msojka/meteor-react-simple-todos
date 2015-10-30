Task = React.createClass({
  
  propTypes: {
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },
  
  toggleChecked() {
    Meteor.call("setChecked", this.props.task._id, !this.props.task.checked);
  },
  
  togglePrivate() {
    Meteor.call("setPrivate", this.props.task._id, !this.props.task.private);
  },
  
  delete() {
    Meteor.call("removeTask", this.props.task._id);
  },
  
  render() {
    const taskClassName = (this.props.task.checked ? "checked" : "") + " " + 
      (this.props.task.private ? "private" : "");
    return(
      <li className={taskClassName}>
        <button className="delete" onClick={this.delete}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked} />
        {this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate}>
            {this.props.task.private ? 'Private' : 'Public'}
          </button>
        ) : ''}
        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
      </li>
    );
  }
  
})