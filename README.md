# Intland Azure Pipelines

## Dependencies

Install them as described [HERE](https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops#prerequisites).

## Build

```bash
cd codeBeamer && tsc && cd ../Retina && tsc && cd ..
```

## Release

To create a new release run:

```bash
tfx extension create --manifest-globs retina-vss-extension.json
tfx extension create --manifest-globs codebeamer-vss-extension.json
```
