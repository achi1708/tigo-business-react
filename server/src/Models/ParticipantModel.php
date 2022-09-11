<?php
namespace Src\Models;

use Src\Models\BaseModel;

class ParticipantModel extends BaseModel {
    
    public function __construct()
    {
        parent::__construct();
        $this->tableModel = 'participant';
        $this->fillableFields = array('p_name', 'p_lastname', 'p_email', 'p_cellphone', 'p_company', 'code_number');
    }
}