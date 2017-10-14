/*jslint es6: true, this: true*/
/*global window, browser, Vue*/
(function () {
    "use strict";

    const defaultDomain = "(default)";

    const generateStateObject = function (initialDomain, standards) {

        const state = {
            selectedDomain: initialDomain,
            standards: standards,
            domainRules: {},
            domainNames: [],
            selectedStandards: [],

            setDomainRules: function (newDomainRules) {
                this.domainRules = newDomainRules;
                this.domainNames = Object.keys(newDomainRules);
                this.selectedStandards = this.domainRules[this.selectedDomain];
            },

            setSelectedDomain: function (newDomain) {
                this.selectedDomain = newDomain;
                this.selectedStandards = this.domainRules[newDomain];
            },

            setSelectedStandards: function (selectedStandards) {
                this.selectedStandards = selectedStandards;
                this.domainRules[this.selectedDomain] = selectedStandards;
            },

            deleteDomainRule: function (domainToDelete) {

                // If we're deleted the domain thats currently selected, then
                // select the default domain.
                if (this.selectedDomain === domainToDelete) {
                    this.setSelectedDomain(defaultDomain);
                }

                delete this.domainRules[domainToDelete];
                this.domainNames = Object.keys(this.domainRules);
            },

            addDomainRule: function (newDomainRule) {
                this.domainRules[newDomainRule] = [];
                this.domainNames = Object.keys(this.domainRules);
                this.selectedDomain = newDomainRule;
            }
        };

        return state;
    };

    window.WEB_API_MANAGER.stateLib = {
        generateStateObject
    };
}());