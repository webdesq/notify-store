'use strict';

const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

const vendor = github.context.payload.repository.full_name.split('/')[0];
const name = github.context.payload.repository.full_name.split('/')[1];
const branch = core.getInput('branch');
const token = core.getInput('token');

console.log('🔎 Checking store availability...');

// Ping to store
fetch('https://store.webdesq.net/ping')
  .then(status => {
    if (status) {
      const body = {
        url: 'http://api.github.com/repos/' + vendor + '/' + name + '/zipball' + (branch ? `/${branch}` : ''),
      };

      if (token) {
        console.log('🔑 Setting token...');
        body.token = token;
      }

      console.log('📯 Posting to store with: \n Vendor:', vendor, '\n Name:', name + (branch ? `\n Branch: ${branch}` : ''));

      // Posting URL to store
      fetch('https://store.webdesq.net/v1/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'plain/text',
        },
        body: JSON.stringify(body),
      })
        .then(response => {
          if (response && response.status === 200) {
            console.log('✅ Successfully informed store');
          }
        })
        .catch(error => {
          console.error(error);
          core.setFailed('🚩 Something went wrong...');
        });
    }
  })
  .catch(error => {
    console.error(error);
    core.setFailed('🚩 Store offline');
  });
