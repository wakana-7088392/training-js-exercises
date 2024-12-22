import axios from 'axios';
import yargs from 'yargs';

const options = yargs(process.argv)
    .usage('Usage: -t <token> -o <owner> -r <repo> -i <title> -b <body> [options]')
    .option('t', { alias: 'token', describe: 'GitHub Token', type: 'string', demandOption: true })
    .option('o', { alias: 'owner', describe: 'Repository Owner', type: 'string', demandOption: true })
    .option('r', { alias: 'repo', describe: 'Repository Name', type: 'string', demandOption: true })
    .option('i', { alias: 'title', describe: 'Issue Title', type: 'string', demandOption: false })
    .option('b', { alias: 'body', describe: 'Issue Body', type: 'string', demandOption: false })
    .option('v', { alias: 'verbose', describe: 'Enable verbose logging', type: 'boolean' })
    .alias('h', 'help')
    .help('h')
    .argv;

// -vまたは--verboseオプションで HTTP ログを出力する
const axiosInstance = axios.create();
console.log(options.verbose)
if (options.verbose) {
    axiosInstance.interceptors.request.use(request => {
        console.log('Starting Request', request);
        return request;
    });
    axiosInstance.interceptors.response.use(response => {
        console.log('Response:', response);
        return response;
    }
    )
}

// issueを生成する
const createIssue = async () => {
    const { token, owner, repo, title, body } = options;
    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
    try {
        const response = await axiosInstance.post(
            url,
            { title, body },
            {
                headers: {
                    Authorization: `token ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Issue created:', response.data.html_url);
    } catch (error) {
        console.error('Error creating issue:', error);
    }
};

// issueの番号を受け取ってそのissueをクローズする
const closeIssue = async (issueNumber) => {
    const { token, owner, repo } = options;
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;

    try {
        const response = await axiosInstance.patch(
            url,
            { state: 'closed' },
            {
                headers: {
                    Authorization: `token ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(`Issue #${issueNumber} closed:`, response.data.html_url);
    } catch (error) {
        console.error('Error closing issue:', error.response.data);
    }
};

// オープンな Issue の Id と Title の一覧を表示する
const listOpenIssues = async () => {
    const { token, owner, repo } = options;
    const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=open`;

    try {
        const response = await axiosInstance.get(url, {
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json',
            },
        });
        response.data.forEach(issue => {
            console.log(`ID: ${issue.number}, Title: ${issue.title}`);
        });
    } catch (error) {
        console.error('Error listing open issues:', error.response.data);
    }
};

// 引数の内容で処理を分岐する
if (options.i) {
    createIssue();
} else if (options.close) {
    closeIssue(options.close);
} else if (options.list) {
    listOpenIssues();
} else {
    yargs.showHelp();
}

// コマンド
// issue生成(createIssue)：node index.js -t XX -o XX -r XX -i "XX" -b "XXXXX"
// issueのクローズ(createIssue)：node index.js -t XX -o XX -r XX --close XX
// issueの一覧表示(createIssue)：node index.js -t XX -o XX -r XX --list
// -v：いずれかのコマンド + -v 