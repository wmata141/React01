import React from "react";

const StepperExample = () => {
  return (
    <div class="row">
      <div class="col-md-12">
        <ul class="stepper stepper-horizontal">
          <li class="completed">
            <a href="#!">
              <span class="circle">1</span>
              <span class="label">First step</span>
            </a>
          </li>
          <li class="active">
            <a href="#!">
              <span class="circle">2</span>
              <span class="label">Second step</span>
            </a>
          </li>
          <li class="warning">
            <a href="#!">
              <span class="circle"><i class="fas fa-exclamation"></i></span>
              <span class="label">Third step</span>
            </a>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default StepperExample;