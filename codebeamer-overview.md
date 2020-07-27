# codeBeamer ALM - MS Azure DevOps (VSTS) Connector for Test Management

## Use Case

Developers of safety-critical software industries such as automotive, medical device, pharmaceutical and aviation need to comply with a variety of standards and regulations such as ISO 26262/ASPICE Maturity, IEC 62304, IEC 82304-1, DO 178C and ISO 14971. To meet these compliance requirements, developers need to demonstrate traceability from establishing requirements through product testing. codeBeamer ALM extends MS Azure DevOps while ensuring traceability for full regulatory compliance.

## What does codeBeamer ALM - MS Azure DevOps Test Management Connector support?

Using this Connector, users of Azure DevOps’ Test Management module can easily configure the integration with codeBeamer ALM. This platform may be used for Requirements, Risk, and Software Development Management (using Waterfall or Agile) to achieve full traceability. All test cases, test runs, and test sets will be synchronized in real-time with Azure DevOps. Once testing is executed, test results are synched back to codeBeamer ALM, ensuring data consistency and easy one-click traceability queries.

## Benefits of using codeBeaner ALM Connector

Users of MS Azure DevOps will continue to be able to use their test management software tools while achieving traceability and compliance. By integrating codeBeamer ALM and MS Azure DevOps Test Management, all test results are synchronised in real-time, and test coverage and traceability reports can be easily pulled any time to support audits.

## Usage

The Connector is easy to set up: after mapping & configuring the necessary test containers for Test Cases, Test Sets and Test Runs in codeBeamer ALM, the two platforms work smoothly together!

After installing this application, it will be shown in the list of Azure Pipelines extensions on the right side of the Pipelines editor. Adding the extension will prompt for all the needed details and add it to the pipeline.

## YAML Pipeline configuration

After installation the extension can also be used from a plain text editor by inserting the template below.

```yaml
- task: codeBeamer@1
  inputs:
    test_xml_folder: "."
    test_run_name: "$(Build.DefinitionName) $(Build.Reason)"
    test_run_id: "$(Build.BuildNumber)"
    server_url: "https://codebeamer-instance-url.com"
    cb_user: "<user>"
    cb_password: "<password>"
    test_configuration_id: "1"
    test_case_tracker_id: "2"
    test_run_tracker_id: "3"
```
