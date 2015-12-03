// JavaScript source code

/**
 * Contracts.js
 * @author Andrew
 */

'use strict';

define(['source/utility/Contract'], function (Contract) {
    try {

        var Contracts = function Contracts() { };

        Contracts.ContractBase = function (options) {
//            Contract.expectString(options.name, 'GraphData::name');
            Contract.expectString(options.type, 'GraphData::type');
        };

        Contracts.ContractChild = function (options) {
            Contract.expectString(options.description, 'description must be a string.');
            Contracts.ContractBase(options);
        };

        Contracts.ContractRelationship = function (options) {
            Contract.expectString(options.sourceVerb, 'sourceVerb must be a string.');
            Contract.expectString(options.targetVerb, 'targetVerb must be a string.');
        };

        return Contracts;
    }
    catch (e) {
        alert(e.message);
    }
});
