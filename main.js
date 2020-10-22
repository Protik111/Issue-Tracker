document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const CloseIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  let openStatus = 0;
  let closeStatus = 0;

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>`;

    if(status=='Open'){
      issuesList.innerHTML += `<h3> ${description} </h3>`;
      openStatus++;
    } else
    {
      issuesList.innerHTML += `<h3> <strike> ${description}</strike></h3>`;
      closeStatus++;
    }

    issuesList.innerHTML += `<p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                             <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                             <a href="#" onclick="CloseIssue(${id})" class="btn btn-warning">Close</a>
                             <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                             </div>`;
  }
  showStatusValue(openStatus,closeStatus);
}
function showStatusValue(openStatus,closeStatus){
  document.getElementById('open-status').innerHTML = `Open Issues : ${openStatus}`;
  document.getElementById('close-status').innerHTML = `Close Issues : ${closeStatus}`;
  document.getElementById('total-status').innerHTML = `Total Issues : ${openStatus + closeStatus}`;

}
