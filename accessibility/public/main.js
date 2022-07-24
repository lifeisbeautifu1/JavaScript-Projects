const testAccessibility = async (e) => {
  e.preventDefault();
  const url = document.querySelector('#url').value;
  if (url == '') {
    alert('Please enter a URL');
  } else {
    const response = await fetch(`/api/test/?url=${url}`);
    if (response.status !== 200) {
      alert('Something went wrong');
    } else {
      const { issues } = await response.json();
      addIssuesToDOM(issues);
    }
  }
};

const addIssuesToDOM = (issues) => {
  const issuesOutput = document.querySelector('#issues');

  issuesOutput.innerHTML = '';

  if (issues.length === 0) {
    issuesOutput.innerHTML = '<h4>No issues found</h4>';
  } else {
    issues.forEach((issue) => {
      const output = `
            <div class="output-card">
                <h4>${issue.message}</h4>
                <p>${escapeHTML(issue.context)}</p>
                <p>
                    CODE: ${issue.code}
                </p>
            </div>
          `;
      issuesOutput.innerHTML += output;
    });
  }
};

function escapeHTML(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

document.querySelector('#form').addEventListener('submit', testAccessibility);
