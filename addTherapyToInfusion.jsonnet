local Therapy(
  newMasterListName='Cy-ML-' + std.native('randomString')(10),
  newMasterListDrug='Cy-MLDrug-' + std.native('randomString')(10),
  newLibraryName='Cy-DL-' + std.native('randomString')(10),
  concentrationDosingUnit='nanogram',
  drugAmount='1',
  volume='1',
  careTypeName='Adult CT',
  patientType= "Adult",
  careTypeCategory= "Epidural",
  firstTherapyName='AUC 2-3 q week',
  secondTherapyName='AUC 3-7.5 q3weeks',
  infusionType='Continuous',
  dosingUnitTherapy1='mcg/m²/min',
  dosingUnitTherapy2='mcg/m²/min',
  minimumDoseHardLimitAmount='1',
  minimumDoseSoftLimitAmount='2',
  maximumDoseSoftLimitAmount='3',
  maximumDoseHardLimitAmount='4',
  defaultDoseAmount='2',
  minimumBolusDoseHardLimitAmount='1',
  minimumBolusDoseSoftLimitAmount='2',
  maximumBolusDoseSoftLimitAmount='3',
  maximumBolusDoseHardLimitAmount='4',
  defaultBolusDoseAmount='2',
  maximumTotalBolusDoseSoftLimitAmount='0',
  maximumTotalBolusDoseHardLimitAmount='0',
  dosingUnitBolus='mcg/m²',
  minimumBolusDurationHardLimitAmountHours='1',
  maximumBolusDurationHardLimitAmountHours='2',
  BSABasedTherapy1=false,
  WeightBasedTherapy1=false,
  NonWeightBasedTherapy1=false,
  BSABasedTherapy2=false,
  WeightBasedTherapy2=false,
  NonWeightBasedTherapy2=false,
  scenario='Verify add therapy to infusion setup',
  tags=['regression', 'unit']
      ) = {
  payload: {
    newMasterListName: newMasterListName,
    newMasterListDrug: newMasterListDrug,
    newLibraryName: newLibraryName,
    concentrationDosingUnit: concentrationDosingUnit,
    drugAmount: drugAmount,
    volume: volume,
    careTypeName: careTypeName,
    patientType: patientType,
    careTypeCategory: careTypeCategory,
    firstTherapyName: firstTherapyName,
    secondTherapyName: secondTherapyName,
    infusionType: infusionType,
    dosingUnitTherapy1: dosingUnitTherapy1,
    dosingUnitTherapy2: dosingUnitTherapy2,
    minimumDoseHardLimitAmount: minimumDoseHardLimitAmount,
    minimumDoseSoftLimitAmount: minimumDoseSoftLimitAmount,
    maximumDoseSoftLimitAmount: maximumDoseSoftLimitAmount,
    maximumDoseHardLimitAmount: maximumDoseHardLimitAmount,
    defaultDoseAmount: defaultDoseAmount,
    minimumBolusDoseHardLimitAmount: minimumBolusDoseHardLimitAmount,
    minimumBolusDoseSoftLimitAmount: minimumBolusDoseSoftLimitAmount,
    maximumBolusDoseSoftLimitAmount: maximumBolusDoseSoftLimitAmount,
    maximumBolusDoseHardLimitAmount: maximumBolusDoseHardLimitAmount,
    defaultBolusDoseAmount: defaultBolusDoseAmount,
    maximumTotalBolusDoseSoftLimitAmount: maximumTotalBolusDoseSoftLimitAmount,
    maximumTotalBolusDoseHardLimitAmount: maximumTotalBolusDoseHardLimitAmount,
    dosingUnitBolus: dosingUnitBolus,
    minimumBolusDurationHardLimitAmountHours: minimumBolusDurationHardLimitAmountHours,
    maximumBolusDurationHardLimitAmountHours: maximumBolusDurationHardLimitAmountHours,
    BSABasedTherapy2:BSABasedTherapy2,
    WeightBasedTherapy2:WeightBasedTherapy2,
    NonWeightBasedTherapy2:NonWeightBasedTherapy2,
    BSABasedTherapy1:BSABasedTherapy1,
    WeightBasedTherapy1:WeightBasedTherapy1,
    NonWeightBasedTherapy1:NonWeightBasedTherapy1,
  },
  scenario: scenario,
  tags: tags,
  testIdentifier: std.md5(self.scenario),
};

//positive testcases
local positiveScenarios = [
  Therapy(tags=['regression'],BSABasedTherapy2=true,dosingUnitTherapy2='mcg/m²/min',dosingUnitTherapy1='mcg/m²/min',BSABasedTherapy1=true),
  Therapy(tags=['regression'],NonWeightBasedTherapy2=true,scenario="Verifying the testcase to add the therapy with Nonweightbased",dosingUnitTherapy2='mcg/min',WeightBasedTherapy1=true,dosingUnitTherapy1='mcg/kg/h'),
  Therapy(tags=['regression'],WeightBasedTherapy2=true,scenario="Verifying the testcase to add the therapy with weightbased",dosingUnitTherapy2='mcg/kg/h',NonWeightBasedTherapy1=true,dosingUnitTherapy1='mcg/min'),
];

//negative testcases
local negativeScenarios = [
];

{
  setup: {
    before: {},
    beforeEach: {},
    after: {},
    afterEach: {},
  },
  testDefinitions: {
    positiveScenarios: [
      {
        scenario: ps.scenario,
        testIdentifier: ps.testIdentifier,
        tags: ps.tags + [ps.testIdentifier],
      }
      for ps in positiveScenarios
    ],
    negativeScenarios: [
      {
        scenario: ns.scenario,
        testIdentifier: ns.testIdentifier,
        tags: ns.tags + [ns.testIdentifier],
      }
      for ns in negativeScenarios
    ],
  },
  testData: {
    positiveScenarios:
      {
        [ps.testIdentifier]: ps
        for ps in positiveScenarios
      },
    negativeScenarios:
      {
        [ns.testIdentifier]: ns
        for ns in negativeScenarios
      },
  },
}
