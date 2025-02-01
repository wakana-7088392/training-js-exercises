import dotenv from 'dotenv';

dotenv.config();

const options = {
  token: process.env.GITHUB_TOKEN,
  owner: process.env.GITHUB_OWNER,
  repo: process.env.GITHUB_REPO,
  title: "Test Issue",
  body: "This is a jest Test Issue",
  verbose: true,
}

// -vまたは--verboseオプションで HTTP ログを出力する
const fetchWithLogging = async (url, options) => {
  if (options.verbose) {
    console.log('Starting Request', { url, ...options });
  }
  const response = await fetch(url, options);
  if (options.verbose) {
    console.log('Response:', response);
  }
  return response;
};

// issueを生成する
export const createIssue = async (options) => {
  const { token, owner, repo, title, body } = options;
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  try {
    const response = await fetchWithLogging(
      url,
      {
        method: 'POST',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      }
    );
    const data = await response.json();
    console.log('Issue created:', data.html_url);
  } catch (error) {
    console.error('Error creating issue:', error);
  }
};

// issueの番号を受け取ってそのissueをクローズする
export const closeIssue = async (options, issueNumber) => {
  const { token, owner, repo } = options;
  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;

  try {
    const response = await fetchWithLogging(
      url,
      {
        method: 'PATCH',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: 'closed' }),
      }
    );
    const data = await response.json();
    console.log(`Issue #${issueNumber} closed:`, data.html_url);
  } catch (error) {
    console.error('Error closing issue:', error);
  }
};

// オープンな Issue の Id と Title の一覧を表示する
export const listOpenIssues = async (options) => {
  const { token, owner, repo } = options;
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=open`;

  try {
    const response = await fetchWithLogging(
      url,
      {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    data.forEach(issue => {
      console.log(`ID: ${issue.number}, Title: ${issue.title}`);
    });
  } catch (error) {
    console.error('Error listing open issues:', error);
  }
};