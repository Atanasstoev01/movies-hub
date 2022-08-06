import "./TopPostNav.css";
import { Tabs, Tab } from 'react-bootstrap';
import TopRecentPosts from "../../views/TopRecentPosts/TopRecentPosts";
import TopLikedPosts from "../../views/TopLikedPosts/TopLikedPosts";

function TopPostNav() {
  
  return (

    <Tabs defaultActiveKey="most-recent-posts" id="uncontrolled-tab-example">
      <Tab eventKey="most-recent-posts" title="Most Recent Posts">
        <TopRecentPosts />
      </Tab>
      <Tab eventKey="most-liked-posts" title="Most Liked Posts">
        <TopLikedPosts />
      </Tab>
  </Tabs>
  );
}
export default TopPostNav;
