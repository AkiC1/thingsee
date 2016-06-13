    # Log in to your Azure account
    Login-AzureRmAccount

    # Select the Azure subscription you want to use to create the resource group.
    Get-AzureRmSubscription –SubscriptionName “xxx” | Select-AzureRmSubscription

    # If Stream Analytics has not been registered to the subscription, remove remark symbol below (#) to run the Register-AzureProvider cmdlet to register the provider namespace.
    Register-AzureRmResourceProvider -Force -ProviderNamespace 'Microsoft.StreamAnalytics'

    # Create an Azure resource group
    New-AzureRMResourceGroup -Name 'xxx' -Location 'West Europe'

    #Get-AzureRMStreamAnalyticsTransformation -ResourceGroupName 'xxx' -JobName 'ASATestJobPS' -Name 'ProcessData'

    Stop-AzureRMStreamAnalyticsJob -ResourceGroupName 'xxx' –Name 'ASATestJobPS' 

    New-AzureRMStreamAnalyticsJob -ResourceGroupName 'xxx' -Name 'ASATestJobPS' –File "location\asa_config.json" 

    Start-AzureRMStreamAnalyticsJob -ResourceGroupName 'xxx' -Name 'ASATestJobPS' -OutputStartMode CustomTime -OutputStartTime '2012-12-12T12:12:12Z'
    