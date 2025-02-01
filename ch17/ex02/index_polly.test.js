import dotenv from 'dotenv';
import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';
import FSPersister from '@pollyjs/persister-fs';
import { createIssue, closeIssue, listOpenIssues } from './index';

describe('ch17/ex02', () => {
    dotenv.config();
    const options = {
        token: process.env.GITHUB_TOKEN,
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        title: "Test Issue",
        body: "This is a jest Test Issue",
        verbose: true,
    }

    // pollyjsの一連の流れ
    Polly.register(FetchAdapter);
    Polly.register(FSPersister);

    const polly = new Polly('Github API', {
        adapters: ['fetch'],
        persister: 'fs',
        // mode: 'record',
        persisterOptions: {
            fs: {
                recordingsDir: './recordings',
            }
        }
    });

    afterAll(async () => {
        await polly.stop();
    })

    test('create issue', async () => {
        console.log = jest.fn();
        await createIssue(options);
        expect(console.log).toHaveBeenCalledWith('Issue created:', `https://github.com/${options.owner}/${options.repo}/issues/26`);
        console.log.mockRestore();
    });

    test('close issue', async () => {
        const issueNumber = 25;
        console.log = jest.fn();
        await closeIssue(options, issueNumber);
        expect(console.log).toHaveBeenCalledWith('Issue #25 closed:', `https://github.com/${options.owner}/${options.repo}/issues/${issueNumber}`);
        console.log.mockRestore();
    });

    test('list issue', async () => {
        console.log = jest.fn();
        await listOpenIssues(options);
        expect(console.log).toHaveBeenCalledWith('ID: 26, Title: Test Issue');
        expect(console.log).toHaveBeenCalledTimes(1);
        console.log.mockRestore();
    });
});