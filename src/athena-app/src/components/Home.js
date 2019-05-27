import React from 'react';
import { withStyles } from '@material-ui/styles';
import UpcomingExams from './UpcomingExams';


const Home = ({classes}) => (
  <div>
    <UpcomingExams/>
  </div>
);

const styles = {
}

export default withStyles(styles)(Home);