import './css/Rank.css';


const Rank = ({ name, entries, route }) => {
    const rankContent = () => {
      return route === "home" ? <> <h3>
            {`${name}, your entery count is `}
        </h3>
            <h2>
                {`# ${entries}`}
            </h2></> :
            <h2>Sign in to show number of enteries</h2>
    }
    return (
        <div className="rank">
           {rankContent()}
        </div>
    );
}

export default Rank;