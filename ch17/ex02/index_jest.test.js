import { createIssue, closeIssue, listOpenIssues } from './index';

describe('ch17/ex02', () => {
    const options = {
        token: "test-token",
        owner: "test-owner",
        repo: "test-repo",
        title: "Test Issue",
        body: "This is a jest Test Issue",
        verbose: true,
    }

    test('createIssue', async () => {
        const mockResponse = {
            json: jest.fn().mockResolvedValue({ html_url: 'https://github.com/test-owner/test-repo/issues/1' }),
        };

        jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

        console.log = jest.fn();

        await createIssue(options);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.github.com/repos/test-owner/test-repo/issues',
            expect.objectContaining({
                method: 'POST',
                headers: {
                    Authorization: 'token test-token',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: 'Test Issue', body: 'This is a jest Test Issue' }),
            })
        );

        expect(console.log).toHaveBeenCalledWith('Issue created:', 'https://github.com/test-owner/test-repo/issues/1');

        global.fetch.mockRestore();
        console.log.mockRestore();
    });

    test('closeIssue', async () => {
        const issueNumber = 1;

        const mockResponse = {
            json: jest.fn().mockResolvedValue({ html_url: 'https://github.com/test-owner/test-repo/issues/1' }),
        };

        jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

        console.log = jest.fn();

        await closeIssue(options, issueNumber);

        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith(
            `https://api.github.com/repos/test-owner/test-repo/issues/${issueNumber}`,
            expect.objectContaining({
                method: 'PATCH',
                headers: {
                    Authorization: 'token test-token',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ state: 'closed' }),
            })
        );

        expect(console.log).toHaveBeenCalledWith('Issue #1 closed:', 'https://github.com/test-owner/test-repo/issues/1');

        global.fetch.mockRestore();
        console.log.mockRestore();
    });

    test('listOpenIssues', async () => {
        const mockResponse = {
            json: jest.fn().mockResolvedValue([
                { number: 1, title: 'Issue 1' },
                { number: 2, title: 'Issue 2' },
            ]),
        };

        jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

        console.log = jest.fn();

        await listOpenIssues(options);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.github.com/repos/test-owner/test-repo/issues?state=open',
            expect.objectContaining({
                method: 'GET',
                headers: {
                    Authorization: 'token test-token',
                    'Content-Type': 'application/json',
                },
            })
        );

        expect(console.log).toHaveBeenCalledWith('ID: 1, Title: Issue 1');
        expect(console.log).toHaveBeenCalledWith('ID: 2, Title: Issue 2');

        global.fetch.mockRestore();
        console.log.mockRestore();
    });
});