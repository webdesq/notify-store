# Inform Webdesq store action

Action for submitting your plugin to the Webdesq store.

## Inputs

Name     | Description
-------- | -------------
branch   | Configure a custom branch for the store to look on
token    | Set a secret personal access token for deploying private repositories

## Example usage

```
uses: webdesq/notify-store@v1.1.1
with:
  branch: 'deploy'
  token: your token
```
