import React, { Component } from 'react';
import { TEST_DATA } from './components/action';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from "@material-ui/core/AppBar";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Copyright from './components/copyright';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Result = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  /**
   * Compare the different of start and end time
   * 
   * @param {string} start 
   * @param {string} end 
   */
  const diffTime = (start, end) => {
    let result = null;
    let startDate = new Date(start);
    let endDate = new Date(end);
    result = (endDate.getTime() - startDate.getTime()) / 1000;
    return result
  }

  /**
   * Get average of time for each question
   * @param {*} list 
   */
  const aver = list => {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      sum += list[i];
    }
    let avg = sum / list.length;
    return avg;
  }

  /**
   * Show top five users' result
   */
  const ShowTopFive = () => {
    let answerCorrectList = {};
    TEST_DATA.map((user, index) => {
      const name = user.name;
      let counter = 0;
      user.answers.map((ans) => {
        if (ans.correct === true) {
          counter += 1
        }
        return index;
      })
      answerCorrectList[counter] = name;
      return index;
    })
    let resultList = Object.values(answerCorrectList).reverse();
    const rank = resultList.map((item, index) => {
      return <div key={index}>No. {index + 1} Player is {item}</div>;
    });
    return (
      <div style={{ margin: '30px' }}>
        <div>The Top Five Player Show Below: </div>
        {rank}
      </div>
    )
  }
  //  show average time
  function AverageTime() {
    let timeUsed = {};
    TEST_DATA.map((user, index) => {
      user.answers.map((item, index) => {
        timeUsed[item.answerIds] = [];
        return index;
      })
      return index;
    })
    //store each question's taken up time
    TEST_DATA.map((user, index) => {
      user.answers.map((item, index) => {
        let time = diffTime(item.questionStartedAt, item.answeredAt);
        timeUsed[item.answerIds].push(time);
        return index;
      })
      return index;
    })
    for (let item in timeUsed) {
      timeUsed[item] = Math.floor(aver(timeUsed[item]));
    }
    let timeUsedList = [];
    for (let item in timeUsed) {
      timeUsedList.push([item, timeUsed[item]]);
    }
    // console.log(timeUsedList);
    const content = timeUsedList.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item[0]}</td>
          <td>{item[1]}s</td>
        </tr>
      )
    })
    return (
      <div style={{ margin: '30px' }}>
        <div>Average answer time for each question show below:</div>
        <table>
          <thead>
            <tr>
              <th>Question ID</th>
              <th>Average Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </table>
      </div>
    )
  }
  //show the accuracy of problem
  //Attention! the echarts only work under class component in React
  class EchartsTest extends Component {
    componentDidMount() {
      //get the data of each accuracy first
      let accNumber = {};
      TEST_DATA.map((user, index) => {
        user.answers.map((item, index) => {
          accNumber[item.answerIds] = 0;
          return index;
        })
        return index;
      });
      TEST_DATA.map((user, index) => {
        user.answers.map((item, index) => {
          if (item.correct === true) {
            accNumber[item.answerIds] += 1;
          }
          return index;
        })
        return index;
      })
      const xData = Object.keys(accNumber);
      const yData = Object.values(accNumber);
      const length = xData.length;
      let newY = [];
      for (let y in yData) {
        const temp = (y / length).toFixed(2)
        newY.push(temp)
      }
      //use echarts to make a bar chart
      let myChart = echarts.init(document.getElementById('main'));
      myChart.setOption({
        title: { text: 'the percentage of people got certain question correct' },
        tooltip: {},
        xAxis: {
          data: xData
        },
        yAxis: {},
        series: [{
          name: 'Accuracy',
          type: 'bar',
          data: newY
        }]
      });
    }
    render() {
      return (
        <div id="main" style={{ width: 400, height: 400 }}>
        </div>
      );
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Check the current result
        </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            {/* <Typography variant="h5" align="center" color="textSecondary" paragraph> */}
              <ShowTopFive />
              <Divider />
              <EchartsTest />
              <Divider />
              <AverageTime />
            <Button size="medium" color="primary" variant="outlined" onClick={() => history.push('../dashBoard')}>
              BACK
            </Button>
            {/* </Typography> */}
          </Container>
        </div>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          BigBrain
      </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Made by Zanning Wang and Weizhou Ren
      </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  )
}

export default Result;