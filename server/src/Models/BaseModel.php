<?php
namespace Src\Models;

class BaseModel {
    private $db;
    protected $tableModel;
    protected $fillableFields;
    protected $pk;

    public function __construct()
    {
        global $dbConnection;
        $this->db = $dbConnection;
        $this->tableModel = '';
        $this->pk = 'id';
        $this->fillableFields = array();
    }

    public function findAll()
    {
        $statement = "SELECT 
                        {$this->pk}, " . implode(',',$this->fillableFields) . 
                        " FROM {$this->tableModel};";
        
        try{
            $statement = $this->db->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch(\PDOException $e){
            throw new \Exception($e->getMessage());
        }
    }

    public function find($id)
    {
        $statement = "SELECT 
                        {$this->pk}, " . implode(',',$this->fillableFields) . 
                        " FROM {$this->tableModel} 
                        WHERE {$this->pk} = ?;";
        
        try{
            $statement = $this->db->prepare($statement);
            $statement->execute(array($id));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch(\PDOException $e){
            throw new \Exception($e->getMessage());
        }
    }

    public function findCustom($filter = array())
    {
        $statement = "SELECT 
                        {$this->pk}, " . implode(',',$this->fillableFields) . 
                        " FROM {$this->tableModel} ";
        $where = "";
        $whereSep = '';
        $whereArr = array();

        foreach($filter as $fieldName => $fieldValue){
            if(in_array($fieldName, $this->fillableFields)){
                $where .= $whereSep."{$fieldName} = ?";
                $whereSep = "AND ";
                $whereArr[] = $fieldValue;
            }
        }

        if($where == ""){
            throw new \Exception('Invalid Where Conditions');
        }else{
            $statement .= "WHERE {$where};";
        }
        
        
        try{
            $statement = $this->db->prepare($statement);
            $statement->execute($whereArr);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch(\PDOException $e){
            throw new \Exception($e->getMessage());
        }
    }

    public function insert($fields = array())
    {
        $statement = "";
        $insertFields = $insertValues = "";
        $insertSep = '';
        $insertArr = array();

        foreach($fields as $fieldName => $fieldValue){
            if(in_array($fieldName, $this->fillableFields)){
                $insertFields .= $insertSep.$fieldName;
                $insertValues .= $insertSep.":".$fieldName;
                $insertSep = ', ';
                $insertArr[$fieldName] = $fieldValue;
            }
        }

        if($insertFields == ""){
            throw new \Exception('Invalid Insert Fields');
        }else{
            $statement .= "INSERT INTO {$this->tableModel} 
                            ({$insertFields})
                            VALUES 
                            ({$insertValues});";
        }

        try{
            $statement = $this->db->prepare($statement);
            $statement->execute($insertArr);
            return $this->db->lastInsertId();
        } catch(\PDOException $e){
            throw new \Exception($e->getMessage());
        }
    }

    public function update($id, $fields = array())
    {
        $statement = "";
        $updateSet = "";
        $updateSep = '';
        $updateArr = array("{$this->pk}" => (int) $id);

        foreach($fields as $fieldName => $fieldValue){
            if(in_array($fieldName, $this->fillableFields)){
                $updateSet .= $updateSep."{$fieldName} = :{$fieldName}";
                $updateSep = ', ';
                $updateArr[$fieldName] = $fieldValue;
            }
        }

        if($updateSet == ""){
            throw new \Exception('Invalid Update Fields');
        }else{
            $statement .= "UPDATE {$this->tableModel} 
                            SET 
                            {$updateSet}
                            WHERE 
                            {$this->pk} = :{$this->pk};";
        }

        try{
            $statement = $this->db->prepare($statement);
            $statement->execute($updateArr);
            return $statement->rowCount();
        } catch(\PDOException $e){
            throw new \Exception($e->getMessage());
        }
    }

}