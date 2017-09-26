import React, { Component } from 'react';
import './App.css';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const marked = require("marked");

class App extends Component {

  translateMarkdown(iniText) {
    return {
      __html: marked(iniText)
    };
  }

  constructor(props) {
    var iniText = 'I am using __markdown__.';
    super(props);
    this.state = {
      text: iniText,
      markdown: this.translateMarkdown(iniText),
    };
    this.loadData = this.loadData.bind(this);
    this.textChanged = this.textChanged.bind(this);
  }

  loadData() {
    fetch('https://github.github.com/github-flavored-markdown/sample_content.html')
      .then((response) => {
        return response.text()
      })
      .then((body) => {
        var split = body.split(/(<\/?body>\W<\/?pre>)|(<\/?pre>\W<\/?body>)/gmi);
        this.setState({
          text: split[3],
          markdown: this.translateMarkdown(split[3])
        });
      })    
  }

  //lifecycle method - load data
  componentDidMount() {
    this.loadData();
  }

  textChanged(event) {
    var changed = event.target.value
    this.setState({
      text: changed,
      markdown: this.translateMarkdown(changed)
    });
  }

  render() {
    return (
      <div className="App container">
        <h2>FreeCodeCamp Challenge - Markdown Previewer</h2>
        <Grid>
          <Row className="show-grid">
            <Col md={6}>
              <FormGroup controlId="formControllsTextarea">
                <ControlLabel><h3>Markdown Input</h3></ControlLabel>
                <FormControl componentClass="textarea" placeholder="Enter Markdown" value={this.state.text} onChange= {this.textChanged}></FormControl>
              </FormGroup>
            </Col>

            <Col md={6}>
              <h2>Markdown Output</h2>
              <div dangerouslySetInnerHTML={this.state.markdown}></div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
