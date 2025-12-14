import Header from "../Components/Header"
import Showcase from "../Components/Showcase"
import Body from "../Components/Body"
import Showcasetwo from "../Components/Showcasetwo"
import ShowcaseThree from "../Components/ShowcaseThree"
import SeconBody from "../Components/SeconBody"
import PartSecondBody from "../Components/PartSecondBody"
import CaptanPage from "../Components/CaptanPage"
import PassengerPage from "../Components/PassengerPage"
import Footer from "../Components/Footer"
import Header1 from "../Components/Header1"
import Local from "./Local"
function Home(){
    return <div>

        <Header1/>
        <Header/>
        <Showcase/>
        <Body/>
        <Local/>
        <SeconBody/>
        <PartSecondBody/>
        <Showcasetwo/>
        <ShowcaseThree/>
        <CaptanPage/>
        <PassengerPage/>
        <Footer/>
    </div>
}
export default Home