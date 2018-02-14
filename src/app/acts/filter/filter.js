/***************************************************************
 * Activity Page Filter Controller
 * Supports the filter controller. The filter controller houses
 * all the individual filters configured to be used by the 
 * app.config. Each filter is a seperate feature and the filter.
 * *************************************************************/
angular.module('PMTViewer').controller('ActsFilterCtrl', function($scope, $rootScope, stateService, config, activityService) {

    $scope.stateService = stateService;
    $scope.filterCount = 0;

    // initialization
    init();

    // when the activity service filter is updated, to this
    $scope.$on('activity-filter-update', function() {
        refresh();
    });

     // when the activity options are updated is updated, to this
    $scope.$on('acts-filter-options-update', function () {
        refresh();
    });

    // menu option clicked (toggle filter menus)
    $scope.onMenuClicked = function(id) {
        // get the active filter by id
        var activeFilter = _.find($scope.page.tools.map.filters, function(filter) {
            return filter.id == id;
        });
        // if filter active, make it inactive
        if (activeFilter.active) {
            activeFilter.active = false;
            activeFilter.arrow = "keyboard_arrow_down";
        }
        // otherwise make all filters inactive except for selected one
        else {
            // make all filters inactive so only one is active at a time
            _.each($scope.page.tools.map.filters, function(filter) {
                filter.active = false;
                filter.arrow = "keyboard_arrow_down";
            });
            // make filter active
            activeFilter.active = true;
            activeFilter.arrow = "keyboard_arrow_up";
        }
    };

    // when clicking on filter from selection area, remove it
    $scope.removeFilter = function(filter) {
        // call the appropriate function based on the filter type
        switch (filter.type) {
            // remove a funding organization filter
            case "fund":
                activityService.removeFundOrgFilter(filter.id);
                break;
            // remove a implementing organization filter
            case "imp":
                activityService.removeImpOrgFilter(filter.id);
                break;
            // remove an organization filter
            case "org":
                activityService.removeOrgFilter(filter.id);
                break;
            // remove an unassigned taxonomy filter
            case "unassigned":
                activityService.removeUnassignedTaxonomyFilter(filter.id);
                break;
            // remove all boundary filters
            case "boundary":
                activityService.removeBoundaryFilter();
                break;
            // remove the keyword filter
            case "keyword":
                activityService.removeKeywordFilter();
                $scope.keyword = null;
                break;
            // remove a classification filter (taxonomy)
            default:
                activityService.removeClassificationFilter(filter.id);
                break;
        }
    };

    // function to clear all filters
    $scope.removeAllFilters = function() {
        var selectedFilters = activityService.getSelectedFilters();
        // filter count is 0
        $scope.filterCount = 0;
        // remove each filter
        _.each(selectedFilters, function(filter) {
            $scope.removeFilter(filter);
        });
    };

    // update the activity service with a keyword string to filter activities
    $scope.filterByKeyword = function(keyword) {
        activityService.setKeywordFilter(keyword);
    };

    // clear the keyword filter
    $scope.clearKeywordFilter = function() {
        if ($scope.keyword.length === 0) {
            activityService.removeKeywordFilter();
        }
    };

    // refresh filters function
    function refresh() {
        // reset selected filters
        $scope.selectedFilters = activityService.getSelectedFilters();
        $scope.filterCount = Object.keys($scope.selectedFilters).length;
    }

    // initialization function for filters
    function init() {
        if (activityService.allActivities.length === 0) {
            var filters = {
                data_group_ids: null,
                taxonomy_filter: null,
                imp_org_ids: null,
                fund_org_ids: null,
                org_ids: null
            };
            // loop through the filters and set any default values
            _.each($scope.page.tools.map.filters, function(filter) {
                // add the size parameter to our filters, but leave null
                // each filter controller will populate after initialization
                filter.size = null;
                // set the arrow based on default active params
                filter.arrow = filter.active ? "keyboard_arrow_up" : "keyboard_arrow_down";
                // collect default settings for each filter type
                switch (filter.type) {
                    case 'datasource':
                        // loop through all the data sources and add all active data sources
                        _.each(filter.params.dataSources, function(dataSource) {
                            if (dataSource.active) {
                                // split dataGroupIds string into array
                                var dataGroupIds = dataSource.dataGroupIds.split(",");
                                // add the data groups to our filters
                                filters.data_group_ids = _.union(filters.data_group_ids, dataGroupIds);
                            }
                        });
                        break;
                    case 'organization':
                        // organization filters currently don't have default active
                        // organizations, but they could in the future
                        break;
                    case 'taxonomy':
                        if (filter.params.defaults.length > 0) {
                            var taxonomy_filter = {
                                taxonomy_id: filter.params.taxonomy_id,
                                classification_ids: filter.params.defaults
                            };
                            // add the taxonomy filter to our filters
                            if (filters.taxonomy_filter === null) {
                                filters.taxonomy_filter = [];
                                filters.taxonomy_filter.push(taxonomy_filter);
                            }
                            else {
                                filters.taxonomy_filter.push(taxonomy_filter);
                            }
                        }
                        break;
                    case 'geographic':
                        // comming soon to the activity page
                        break;
                    default:
                        break;
                }
            });
            // send the collected filters to the activity service
            activityService.setFilters(filters.data_group_ids, filters.taxonomy_filter, filters.imp_org_ids, filters.fund_org_ids,
                filters.org_ids, null, null, null);
        }
        else {
            refresh();
        }
    }

});

// all templates used by the filter
require('./datasource/datasource.js');
require('./organization/organization.js');
require('./taxonomy/taxonomy.js');
require('./geographic/geographic.js');