<?php
namespace Src\Controllers;

use Src\Controllers\BaseController;
use Src\Models\ParticipantModel;

class ParticipantController extends BaseController{

    public function __construct()
    {

    }

    public function save()
    {
        $post = $_POST;

        if(!isset($post['name']) || !$post['name'] || !isset($post['lastname']) || !$post['lastname'] || !isset($post['email']) || !$post['email']){
            return $this->response(401, 'Error', 'Debe completar los campos obligatorios.');
        }

        $participant = ['p_name' => $post['name'],
                        'p_lastname' => $post['lastname'],
                        'p_email' => $post['email'],
                        'p_cellphone' => $post['cellphone'] ?? '',
                        'p_company' => $post['company'] ?? ''];

        try{
            $participantModel = new ParticipantModel();
            $result = $participantModel->insert($participant);
            return $this->response(201, 'Ok', 'Participant created', $result);
        } catch(\Exception $e){
            return $this->response(500, 'Error', 'Error al registrar el usuario ('.$e->getMessage().').');
        }
        
    }

    public function update($id)
    {
        $post = $_POST;
        $participantModel = new ParticipantModel();

        if(!isset($post['codigo'])){
            return $this->response(401, 'Error', 'Por favor ingrese el código del usuario.');    
        }

        try{
            $registro = $participantModel->find($id);
            
            if(count($registro) != 1){
                return $this->response(401, 'Error', 'Usuario no valido, vuelva a realizar el registro del usuario por favor.');    
            }else{
                if($registro[0]['code_number'] != ''){
                    return $this->response(401, 'Error', 'Este usuario ya había realizado el ingreso del código.');    
                }
            }

            $updateSet = array('code_number' => $post['codigo']);
            $result = $participantModel->update($id, $updateSet);
            if($result){
                return $this->response(200, 'Ok', 'Participant Code updated', $result);
            }else{
                return $this->response(401, 'Error', 'Error al verificar el código del usuario, por favor inténtelo de nuevo.');    
            }

        } catch(\Exception $e){
            return $this->response(500, 'Error', 'Error al verificar el código del usuario, por favor inténtelo de nuevo.');
        }
    }
}