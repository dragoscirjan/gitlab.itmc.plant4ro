System.register(['aurelia-validation'], function (_export) {
    'use strict';

    var Utilities, data;
    return {
        setters: [function (_aureliaValidation) {
            Utilities = _aureliaValidation.Utilities;
        }],
        execute: function () {
            data = {
                settings: {
                    'numericRegex': /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
                },
                messages: {
                    'isRequired': 'is required',
                    'onValidateCallback': 'not a valid value',
                    'AlphaNumericOrWhitespaceValidationRule': function AlphaNumericOrWhitespaceValidationRule(newValue, threshold) {
                        return 'can contain only alphanumerical characters or spaces';
                    },
                    'AlphaNumericValidationRule': function AlphaNumericValidationRule(newValue, threshold) {
                        return 'can contain only alphanumerical characters';
                    },
                    'AlphaValidationRule': function AlphaValidationRule(newValue, threshold) {
                        return 'can contain only letters';
                    },
                    'AlphaOrWhitespaceValidationRule': function AlphaOrWhitespaceValidationRule(newValue, threshold) {
                        return 'can contain only letters or spaces';
                    },
                    'BetweenLengthValidationRule': function BetweenLengthValidationRule(newValue, threshold) {
                        return 'needs to be between ' + Utilities.getValue(threshold.minimumLength) + ' and ' + Utilities.getValue(threshold.maximumLength) + ' characters long';
                    },
                    'BetweenValueValidationRule': function BetweenValueValidationRule(newValue, threshold) {
                        return 'needs to be between ' + Utilities.getValue(threshold.minimumValue) + ' and ' + Utilities.getValue(threshold.maximumValue);
                    },
                    'CustomFunctionValidationRule': function CustomFunctionValidationRule(newValue, threshold) {
                        return 'not a valid value';
                    },
                    'DigitValidationRule': function DigitValidationRule(newValue, threshold) {
                        return 'can contain only digits';
                    },
                    'EmailValidationRule': function EmailValidationRule(newValue, threshold) {
                        return 'is not a valid email address';
                    },
                    'EqualityValidationRule': function EqualityValidationRule(newValue, threshold) {
                        return 'should be ' + Utilities.getValue(threshold.otherValue);
                    },
                    'InEqualityValidationRule': function InEqualityValidationRule(newValue, threshold) {
                        return 'cannot be ' + Utilities.getValue(threshold.otherValue);
                    },
                    'EqualityWithOtherLabelValidationRule': function EqualityWithOtherLabelValidationRule(newValue, threshold) {
                        return 'does not match ' + Utilities.getValue(threshold.otherValueLabel);
                    },
                    'InEqualityWithOtherLabelValidationRule': function InEqualityWithOtherLabelValidationRule(newValue, threshold) {
                        return 'cannot match ' + Utilities.getValue(threshold.otherValueLabel);
                    },
                    'InCollectionValidationRule': function InCollectionValidationRule(newValue, threshold) {
                        return 'not a valid value';
                    },
                    'MinimumInclusiveValueValidationRule': function MinimumInclusiveValueValidationRule(newValue, threshold) {
                        return 'needs to be ' + Utilities.getValue(threshold) + ' or more';
                    },
                    'MinimumLengthValidationRule': function MinimumLengthValidationRule(newValue, threshold) {
                        return 'needs to be at least ' + Utilities.getValue(threshold) + ' characters long';
                    },
                    'MinimumValueValidationRule': function MinimumValueValidationRule(newValue, threshold) {
                        return 'needs to be more than ' + Utilities.getValue(threshold);
                    },
                    'MaximumInclusiveValueValidationRule': function MaximumInclusiveValueValidationRule(newValue, threshold) {
                        return 'needs to be ' + Utilities.getValue(threshold) + ' or less';
                    },
                    'MaximumLengthValidationRule': function MaximumLengthValidationRule(newValue, threshold) {
                        return 'cannot be longer than ' + Utilities.getValue(threshold) + ' characters';
                    },
                    'MaximumValueValidationRule': function MaximumValueValidationRule(newValue, threshold) {
                        return 'needs to be less than ' + Utilities.getValue(threshold);
                    },
                    'NumericValidationRule': function NumericValidationRule(newValue, threshold) {
                        return 'needs to be a number';
                    },
                    'NoSpacesValidationRule': function NoSpacesValidationRule(newValue, threshold) {
                        return 'cannot contain spaces';
                    },
                    'RegexValidationRule': function RegexValidationRule(newValue, threshold) {
                        return 'not a valid value';
                    },
                    'ContainsOnlyValidationRule': function ContainsOnlyValidationRule(newValue, threshold) {
                        return 'not a valid value';
                    },
                    'StrongPasswordValidationRule': function StrongPasswordValidationRule(newValue, threshold) {
                        return 'should contain a combination of lowercase letters, uppercase letters, digits and special characters';
                    },
                    'MediumPasswordValidationRule': function MediumPasswordValidationRule(newValue, threshold) {
                        return 'should contain at least ' + Utilities.getValue(threshold) + ' of the following groups: lowercase letters, uppercase letters, digits or special characters';
                    },
                    'URLValidationRule': function URLValidationRule(newValue, threshold) {
                        return 'is not a valid URL';
                    }
                }
            };

            _export('data', data);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9wbHVnaW5zL2F1cmVsaWEtdmFsaWRhdGlvbi9yZXNvdXJjZXMvcm8tUk8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21CQUVXLElBQUk7OzsyQ0FGUCxTQUFTOzs7QUFFTixnQkFBSSxHQUFHO0FBQ2Qsd0JBQVEsRUFBRTtBQUNOLGtDQUFjLEVBQUUsMkNBQTJDO2lCQUM5RDtBQUNELHdCQUFRLEVBQUU7QUFDTixnQ0FBWSxFQUFFLGFBQWE7QUFDM0Isd0NBQW9CLEVBQUUsbUJBQW1CO0FBQ3pDLDREQUF3QyxFQUFFLGdEQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUs7QUFDL0Qsc0ZBQThEO3FCQUNqRTtBQUNELGdEQUE0QixFQUFFLG9DQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUs7QUFDbkQsNEVBQW9EO3FCQUN2RDtBQUNELHlDQUFxQixFQUFFLDZCQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUs7QUFDNUMsMERBQWtDO3FCQUNyQztBQUNELHFEQUFpQyxFQUFFLHlDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUs7QUFDeEQsb0VBQTRDO3FCQUMvQztBQUNELGlEQUE2QixFQUFFLHFDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUs7QUFDcEQsd0RBQThCLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxhQUFRLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxzQkFBbUI7cUJBQ2xKO0FBQ0QsZ0RBQTRCLEVBQUUsb0NBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUNuRCx3REFBOEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLGFBQVEsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUc7cUJBQ2hJO0FBQ0Qsa0RBQThCLEVBQUUsc0NBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUNyRCxtREFBMkI7cUJBQzlCO0FBQ0QseUNBQXFCLEVBQUUsNkJBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUM1Qyx5REFBaUM7cUJBQ3BDO0FBQ0QseUNBQXFCLEVBQUUsNkJBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUM1Qyw4REFBc0M7cUJBQ3pDO0FBQ0QsNENBQXdCLEVBQUUsZ0NBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUMvQyw4Q0FBb0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUc7cUJBQ2xFO0FBQ0QsOENBQTBCLEVBQUUsa0NBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUNqRCw4Q0FBb0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUc7cUJBQ2xFO0FBQ0QsMERBQXNDLEVBQUUsOENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUM3RCxtREFBeUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUc7cUJBQzVFO0FBQ0QsNERBQXdDLEVBQUUsZ0RBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUMvRCxpREFBdUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUc7cUJBQzFFO0FBQ0QsZ0RBQTRCLEVBQUUsb0NBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUNuRCxtREFBMkI7cUJBQzlCO0FBQ0QseURBQXFDLEVBQUUsNkNBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUM1RCxnREFBc0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsY0FBVztxQkFDakU7QUFDRCxpREFBNkIsRUFBRSxxQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFLO0FBQ3BELHlEQUErQixTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxzQkFBbUI7cUJBQ2xGO0FBQ0QsZ0RBQTRCLEVBQUUsb0NBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUNuRCwwREFBZ0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBRztxQkFDbkU7QUFDRCx5REFBcUMsRUFBRSw2Q0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFLO0FBQzVELGdEQUFzQixTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxjQUFXO3FCQUNqRTtBQUNELGlEQUE2QixFQUFFLHFDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUs7QUFDcEQsMERBQWdDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGlCQUFjO3FCQUM5RTtBQUNELGdEQUE0QixFQUFFLG9DQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUs7QUFDbkQsMERBQWdDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUc7cUJBQ25FO0FBQ0QsMkNBQXVCLEVBQUUsK0JBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUM5QyxzREFBOEI7cUJBQ2pDO0FBQ0QsNENBQXdCLEVBQUUsZ0NBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUMvQyx1REFBK0I7cUJBQ2xDO0FBQ0QseUNBQXFCLEVBQUUsNkJBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUM1QyxtREFBMkI7cUJBQzlCO0FBQ0QsZ0RBQTRCLEVBQUUsb0NBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUNuRCxtREFBMkI7cUJBQzlCO0FBQ0Qsa0RBQThCLEVBQUUsc0NBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUNyRCxxSUFBNkc7cUJBQ2hIO0FBQ0Qsa0RBQThCLEVBQUUsc0NBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUNyRCw0REFBa0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsa0dBQStGO3FCQUNqSztBQUNELHVDQUFtQixFQUFFLDJCQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUs7QUFDMUMsb0RBQTRCO3FCQUMvQjtpQkFDSjthQUNKIiwiZmlsZSI6ImxpYi9wbHVnaW5zL2F1cmVsaWEtdmFsaWRhdGlvbi9yZXNvdXJjZXMvcm8tUk8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1V0aWxpdGllc30gZnJvbSAnYXVyZWxpYS12YWxpZGF0aW9uJztcblxuZXhwb3J0IGxldCBkYXRhID0ge1xuICAgIHNldHRpbmdzOiB7XG4gICAgICAgICdudW1lcmljUmVnZXgnOiAvXi0/KD86XFxkK3xcXGR7MSwzfSg/OixcXGR7M30pKyk/KD86XFwuXFxkKyk/JC9cbiAgICB9LFxuICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICdpc1JlcXVpcmVkJzogJ2lzIHJlcXVpcmVkJyxcbiAgICAgICAgJ29uVmFsaWRhdGVDYWxsYmFjayc6ICdub3QgYSB2YWxpZCB2YWx1ZScsXG4gICAgICAgICdBbHBoYU51bWVyaWNPcldoaXRlc3BhY2VWYWxpZGF0aW9uUnVsZSc6IChuZXdWYWx1ZSwgdGhyZXNob2xkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYGNhbiBjb250YWluIG9ubHkgYWxwaGFudW1lcmljYWwgY2hhcmFjdGVycyBvciBzcGFjZXNgO1xuICAgICAgICB9LFxuICAgICAgICAnQWxwaGFOdW1lcmljVmFsaWRhdGlvblJ1bGUnOiAobmV3VmFsdWUsIHRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBjYW4gY29udGFpbiBvbmx5IGFscGhhbnVtZXJpY2FsIGNoYXJhY3RlcnNgO1xuICAgICAgICB9LFxuICAgICAgICAnQWxwaGFWYWxpZGF0aW9uUnVsZSc6IChuZXdWYWx1ZSwgdGhyZXNob2xkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYGNhbiBjb250YWluIG9ubHkgbGV0dGVyc2A7XG4gICAgICAgIH0sXG4gICAgICAgICdBbHBoYU9yV2hpdGVzcGFjZVZhbGlkYXRpb25SdWxlJzogKG5ld1ZhbHVlLCB0aHJlc2hvbGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgY2FuIGNvbnRhaW4gb25seSBsZXR0ZXJzIG9yIHNwYWNlc2A7XG4gICAgICAgIH0sXG4gICAgICAgICdCZXR3ZWVuTGVuZ3RoVmFsaWRhdGlvblJ1bGUnOiAobmV3VmFsdWUsIHRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBuZWVkcyB0byBiZSBiZXR3ZWVuICR7VXRpbGl0aWVzLmdldFZhbHVlKHRocmVzaG9sZC5taW5pbXVtTGVuZ3RoKX0gYW5kICR7VXRpbGl0aWVzLmdldFZhbHVlKHRocmVzaG9sZC5tYXhpbXVtTGVuZ3RoKX0gY2hhcmFjdGVycyBsb25nYDtcbiAgICAgICAgfSxcbiAgICAgICAgJ0JldHdlZW5WYWx1ZVZhbGlkYXRpb25SdWxlJzogKG5ld1ZhbHVlLCB0aHJlc2hvbGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgbmVlZHMgdG8gYmUgYmV0d2VlbiAke1V0aWxpdGllcy5nZXRWYWx1ZSh0aHJlc2hvbGQubWluaW11bVZhbHVlKX0gYW5kICR7VXRpbGl0aWVzLmdldFZhbHVlKHRocmVzaG9sZC5tYXhpbXVtVmFsdWUpfWA7XG4gICAgICAgIH0sXG4gICAgICAgICdDdXN0b21GdW5jdGlvblZhbGlkYXRpb25SdWxlJzogKG5ld1ZhbHVlLCB0aHJlc2hvbGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgbm90IGEgdmFsaWQgdmFsdWVgO1xuICAgICAgICB9LFxuICAgICAgICAnRGlnaXRWYWxpZGF0aW9uUnVsZSc6IChuZXdWYWx1ZSwgdGhyZXNob2xkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYGNhbiBjb250YWluIG9ubHkgZGlnaXRzYDtcbiAgICAgICAgfSxcbiAgICAgICAgJ0VtYWlsVmFsaWRhdGlvblJ1bGUnOiAobmV3VmFsdWUsIHRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBpcyBub3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzYDtcbiAgICAgICAgfSxcbiAgICAgICAgJ0VxdWFsaXR5VmFsaWRhdGlvblJ1bGUnOiAobmV3VmFsdWUsIHRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBzaG91bGQgYmUgJHtVdGlsaXRpZXMuZ2V0VmFsdWUodGhyZXNob2xkLm90aGVyVmFsdWUpfWA7XG4gICAgICAgIH0sXG4gICAgICAgICdJbkVxdWFsaXR5VmFsaWRhdGlvblJ1bGUnOiAobmV3VmFsdWUsIHRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBjYW5ub3QgYmUgJHtVdGlsaXRpZXMuZ2V0VmFsdWUodGhyZXNob2xkLm90aGVyVmFsdWUpfWA7XG4gICAgICAgIH0sXG4gICAgICAgICdFcXVhbGl0eVdpdGhPdGhlckxhYmVsVmFsaWRhdGlvblJ1bGUnOiAobmV3VmFsdWUsIHRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBkb2VzIG5vdCBtYXRjaCAke1V0aWxpdGllcy5nZXRWYWx1ZSh0aHJlc2hvbGQub3RoZXJWYWx1ZUxhYmVsKX1gO1xuICAgICAgICB9LFxuICAgICAgICAnSW5FcXVhbGl0eVdpdGhPdGhlckxhYmVsVmFsaWRhdGlvblJ1bGUnOiAobmV3VmFsdWUsIHRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBjYW5ub3QgbWF0Y2ggJHtVdGlsaXRpZXMuZ2V0VmFsdWUodGhyZXNob2xkLm90aGVyVmFsdWVMYWJlbCl9YDtcbiAgICAgICAgfSxcbiAgICAgICAgJ0luQ29sbGVjdGlvblZhbGlkYXRpb25SdWxlJzogKG5ld1ZhbHVlLCB0aHJlc2hvbGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgbm90IGEgdmFsaWQgdmFsdWVgO1xuICAgICAgICB9LFxuICAgICAgICAnTWluaW11bUluY2x1c2l2ZVZhbHVlVmFsaWRhdGlvblJ1bGUnOiAobmV3VmFsdWUsIHRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBuZWVkcyB0byBiZSAke1V0aWxpdGllcy5nZXRWYWx1ZSh0aHJlc2hvbGQpfSBvciBtb3JlYDtcbiAgICAgICAgfSxcbiAgICAgICAgJ01pbmltdW1MZW5ndGhWYWxpZGF0aW9uUnVsZSc6IChuZXdWYWx1ZSwgdGhyZXNob2xkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYG5lZWRzIHRvIGJlIGF0IGxlYXN0ICR7VXRpbGl0aWVzLmdldFZhbHVlKHRocmVzaG9sZCl9IGNoYXJhY3RlcnMgbG9uZ2A7XG4gICAgICAgIH0sXG4gICAgICAgICdNaW5pbXVtVmFsdWVWYWxpZGF0aW9uUnVsZSc6IChuZXdWYWx1ZSwgdGhyZXNob2xkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYG5lZWRzIHRvIGJlIG1vcmUgdGhhbiAke1V0aWxpdGllcy5nZXRWYWx1ZSh0aHJlc2hvbGQpfWA7XG4gICAgICAgIH0sXG4gICAgICAgICdNYXhpbXVtSW5jbHVzaXZlVmFsdWVWYWxpZGF0aW9uUnVsZSc6IChuZXdWYWx1ZSwgdGhyZXNob2xkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYG5lZWRzIHRvIGJlICR7VXRpbGl0aWVzLmdldFZhbHVlKHRocmVzaG9sZCl9IG9yIGxlc3NgO1xuICAgICAgICB9LFxuICAgICAgICAnTWF4aW11bUxlbmd0aFZhbGlkYXRpb25SdWxlJzogKG5ld1ZhbHVlLCB0aHJlc2hvbGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgY2Fubm90IGJlIGxvbmdlciB0aGFuICR7VXRpbGl0aWVzLmdldFZhbHVlKHRocmVzaG9sZCl9IGNoYXJhY3RlcnNgO1xuICAgICAgICB9LFxuICAgICAgICAnTWF4aW11bVZhbHVlVmFsaWRhdGlvblJ1bGUnOiAobmV3VmFsdWUsIHRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBuZWVkcyB0byBiZSBsZXNzIHRoYW4gJHtVdGlsaXRpZXMuZ2V0VmFsdWUodGhyZXNob2xkKX1gO1xuICAgICAgICB9LFxuICAgICAgICAnTnVtZXJpY1ZhbGlkYXRpb25SdWxlJzogKG5ld1ZhbHVlLCB0aHJlc2hvbGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgbmVlZHMgdG8gYmUgYSBudW1iZXJgO1xuICAgICAgICB9LFxuICAgICAgICAnTm9TcGFjZXNWYWxpZGF0aW9uUnVsZSc6IChuZXdWYWx1ZSwgdGhyZXNob2xkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYGNhbm5vdCBjb250YWluIHNwYWNlc2A7XG4gICAgICAgIH0sXG4gICAgICAgICdSZWdleFZhbGlkYXRpb25SdWxlJzogKG5ld1ZhbHVlLCB0aHJlc2hvbGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgbm90IGEgdmFsaWQgdmFsdWVgO1xuICAgICAgICB9LFxuICAgICAgICAnQ29udGFpbnNPbmx5VmFsaWRhdGlvblJ1bGUnOiAobmV3VmFsdWUsIHRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBub3QgYSB2YWxpZCB2YWx1ZWA7XG4gICAgICAgIH0sXG4gICAgICAgICdTdHJvbmdQYXNzd29yZFZhbGlkYXRpb25SdWxlJzogKG5ld1ZhbHVlLCB0aHJlc2hvbGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgc2hvdWxkIGNvbnRhaW4gYSBjb21iaW5hdGlvbiBvZiBsb3dlcmNhc2UgbGV0dGVycywgdXBwZXJjYXNlIGxldHRlcnMsIGRpZ2l0cyBhbmQgc3BlY2lhbCBjaGFyYWN0ZXJzYDtcbiAgICAgICAgfSxcbiAgICAgICAgJ01lZGl1bVBhc3N3b3JkVmFsaWRhdGlvblJ1bGUnOiAobmV3VmFsdWUsIHRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBzaG91bGQgY29udGFpbiBhdCBsZWFzdCAke1V0aWxpdGllcy5nZXRWYWx1ZSh0aHJlc2hvbGQpfSBvZiB0aGUgZm9sbG93aW5nIGdyb3VwczogbG93ZXJjYXNlIGxldHRlcnMsIHVwcGVyY2FzZSBsZXR0ZXJzLCBkaWdpdHMgb3Igc3BlY2lhbCBjaGFyYWN0ZXJzYDtcbiAgICAgICAgfSxcbiAgICAgICAgJ1VSTFZhbGlkYXRpb25SdWxlJzogKG5ld1ZhbHVlLCB0aHJlc2hvbGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgaXMgbm90IGEgdmFsaWQgVVJMYDtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
