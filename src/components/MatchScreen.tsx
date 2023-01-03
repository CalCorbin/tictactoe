import './MatchScreen.css';
const MatchScreen = () => {
  return (
    <div className="match-screen" data-testid="match-screen">
      <div>Waiting to find your opponent...</div>
      <div className="player-selection">
        <div>
          <span>X</span>
        </div>
        <div>
          <span>O</span>
        </div>
      </div>
    </div>
  );
};

export default MatchScreen;
