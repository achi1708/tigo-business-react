<?php
namespace Src\Controllers;

use Src\Controllers\BaseController;
use Src\Models\MainCodesModel;

class CodeController extends BaseController {

    public function __construct()
    {

    }

    public function verify($checkCode)
    {
        $mainCodesModel = new MainCodesModel();

        try{
            $filter = array('code_number' => $checkCode);
            $registro = $mainCodesModel->findCustom($filter);
            
            if(count($registro) > 1){
                return $this->response(401, 'Error', 'Error al verificar el código ganador, inténtelo de nuevo por favor.');    
            }else{
                return $this->response(200, 'Ok', 'Check code out results', $registro);
            }

        } catch(\Exception $e){
            return $this->response(500, 'Error', 'Error al verificar el código ganador, inténtelo de nuevo por favor.');
        }
    }
}