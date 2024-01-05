import ModalAdd from "../modals/ModalAdd";
import ChecksTable from "../table/ChecksTable";


const Home = () => {
    return (
        <div className="container pt-3">
            <ModalAdd />
            <ChecksTable />
        </div>
    );
};

export default Home;
