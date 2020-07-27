# Intland Retina - MS Azure DevOps (VSTS) Connector for Test Management

## Use Case

Developers of safety-critical software industries such as automotive, medical device, pharmaceutical and aviation need to comply with a variety of standards and regulations such as ISO 26262/ASPICE Maturity, IEC 62304, IEC 82304-1, DO 178C and ISO 14971. To meet these compliance requirements, developers need to demonstrate traceability from establishing requirements through product testing. Intland Retina extends MS Azure DevOps while ensuring traceability for full regulatory compliance.

## What does Intland Retina - MS Azure DevOps Test Management Connector support?

Using this Connector, users of Azure DevOps’ Test Management module can easily configure the integration with Intland Retina. This platform may be used for Requirements, Risk, and Software Development Management (using Waterfall or Agile) to achieve full traceability. All test cases, test runs, and test sets will be synchronized in real-time with Azure DevOps. Once testing is executed, test results are synched back to Intland Retina, ensuring data consistency and easy one-click traceability queries.

## Benefits of using Intland Retina Connector

Users of MS Azure DevOps will continue to be able to use their test management software tools while achieving traceability and compliance. By integrating Intland Retina and MS Azure DevOps Test Management, all test results are synchronised in real-time, and test coverage and traceability reports can be easily pulled any time to support audits.

## Usage

The Connector is easy to set up: after mapping & configuring the necessary test containers for Test Cases, Test Sets and Test Runs in Intland Retina, the two platforms work smoothly together!

After installing this application, it will be shown in the list of Azure Pipelines extensions on the right side of the Pipelines editor. Adding the extension will prompt for all the needed details and add it to the pipeline.

## YAML Pipeline configuration

After installation the extension can also be used from a plain text editor by inserting the template below.

```yaml
- task: retina@1
  inputs:
    test_xml_folder: "."
    test_run_name: "$(Build.DefinitionName) $(Build.Reason)"
    test_run_id: "$(Build.BuildNumber)"
    server_url: "https://retina-instance-url.com/retina"
    retina_user: "<user>"
    retina_password: "<password>"
    test_configuration_id: "1"
    test_case_tracker_id: "2"
    test_run_tracker_id: "3"
```
