pragma solidity 0.5.0;
contract Ballot {
  address chairperson;
  uint Id;
  uint uniqueId;
  
  constructor() public {
        chairperson = msg.sender;
            }
    struct Voter {
        bool isVoted;
           }
         struct voterId{
             bool isVoted;
          }
    struct candidateReg {
        string name;
        uint candidateId;
        string adharnumber;
        string symbol;
        string standingFrom;
        bool isRegistered;
           }
    struct candidate{
        string name;
        uint candidateId;
        string symbol;
        uint votes;
        
          }
    
    mapping(address => Voter)  public voters;
    mapping(string=>voterId) public voterIds;
    mapping (uint=>candidate) private candidates;
    mapping(string=>candidateReg) public RegisteredCandidates;
    candidateReg[] public candidateListing;
    
    function addCandidate(string memory _name, string memory _adharNumber,string memory _symbol, string memory _standingFrom ) public {
        require(msg.sender==chairperson);
        require(!RegisteredCandidates[_adharNumber].isRegistered);
        uniqueId=Id++;
        RegisteredCandidates[_adharNumber].name=_name;
        RegisteredCandidates[_adharNumber].candidateId=uniqueId;
        RegisteredCandidates[_adharNumber].adharnumber=_adharNumber;
        RegisteredCandidates[_adharNumber].symbol=_symbol;
        RegisteredCandidates[_adharNumber].standingFrom=_standingFrom;
        RegisteredCandidates[_adharNumber].isRegistered=true;
        candidateReg memory candidate =candidateReg(_name, uniqueId, _adharNumber, _symbol, _standingFrom, true);
        candidateListing.push(candidate);
        candidates[uniqueId].name=_name;
        candidates[uniqueId].candidateId=uniqueId;
        candidates[uniqueId].symbol=_symbol;
             }
    function vote(string memory _adharNumber, uint _candidateId) public {
        require(!voterIds[_adharNumber].isVoted);
        require(!voters[msg.sender].isVoted);
      
      candidates[_candidateId].votes++;
      voterIds[_adharNumber].isVoted=true;
      voters[msg.sender].isVoted=true;
        
             }     
 function countVotes(uint _candidateId) public view returns(string memory, uint,string memory, uint) {
   require(msg.sender==chairperson);
   return(candidates[_candidateId].name,candidates[_candidateId].candidateId, candidates[_candidateId].symbol, candidates[_candidateId].votes);
             }
}

