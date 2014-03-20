'use strict';

angular.module('angularfullstackApp')
  .controller('MainCtrl', function ($scope,BudgetItemService) {


    BudgetItemService.getAll()
      .success(function(items){
        $scope.budgetItems = items.slice();
      })
      .error(function(err){
        console.log('BudgetItemService err ',err);
      });


    $scope.newItem = {description:'',amount:''};

    $scope.add = function($event){
      if($event.keyCode===13 &&
        $scope.newItem.description!=='' &&
        $scope.newItem.amount!=='' ){

        BudgetItemService.add($scope.newItem).success(function(item){

          $scope.budgetItems.push(item);

        }).error(function(err){
          console.log('it sucks ',err);
        });

        console.log($event.keyCode);
      }
    };



    // $http.get('/api/awesomeThings').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });
  });
