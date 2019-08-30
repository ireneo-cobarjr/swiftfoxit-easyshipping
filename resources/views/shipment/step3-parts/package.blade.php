<div class="row">
    <div class="col-md-12">
        <div class="packages-panel">
            <h5>Package Details</h5>
            <div class="packages-panel-head">
                <div class="row">
                    <div class="col-md-1"><span class="text-muted">Quantity</span></div>
                    <div class="col-md-2">
                        <span class="unit-changer cursor-pointer" id="weight">
                            <span class="unit-menu card-style-shadow">
                                <span class="d-inline-block units" data-value="Kg" data-set-to="weight-unit">Kilogram (Kg)</span>
                                <span class="d-inline-block units" data-value="lb" data-set-to="weight-unit">Pound (lb)</span>
                            </span>
                            Weight
                            <span id="weight-unit">(Kg)</span> <i class="fas fa-chevron-down" id="show-weight"></i>
                        </span>
                    </div>
                    <div class="col-md-4">
                        <span class="unit-changer cursor-pointer" id="dimension">
                            <span class="unit-menu card-style-shadow">
                                <span class="d-block units" data-value="cm" data-set-to="dimension-unit">centimeter (cm)</span>
                                <span class="d-block units" data-value="inch" data-set-to="dimension-unit">inch (in)</span>
                            </span>
                            Dimensions
                            <span id="dimension-unit">(cm)</span> <i class="fas fa-chevron-down" id="show-dimension"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="packages-panel-body">
                <div id="box-area">
                </div>
                <div class="w-100 h-100 d-flex justify-content-end align-items-center mt-4">
                    <button class="btn btn-yellow btn-sm" id="add-package"><i class="fas fa-plus-square"></i> Add Package</button>
                </div>
            </div>
        </div>
    </div>
</div>
