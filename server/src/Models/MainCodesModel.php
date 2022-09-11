<?php
namespace Src\Models;

use Src\Models\BaseModel;

class MainCodesModel extends BaseModel {
    
    public function __construct()
    {
        parent::__construct();
        $this->tableModel = 'main_codes';
        $this->fillableFields = array('code_number');
    }
}