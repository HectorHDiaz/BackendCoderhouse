document.addEventListener('DOMContentLoaded', function() {

  const leftFabElems = document.querySelectorAll('.left-fixed-action-btn');
  console.log(leftFabElems);
  M.FloatingActionButton.init(leftFabElems, {
    direction: 'left',
  });

  const fabElems = document.querySelectorAll('.fixed-action-btn');
  M.FloatingActionButton.init(fabElems, {
    hoverEnabled: true
  });

  const tooltipsElems = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(tooltipsElems);
});