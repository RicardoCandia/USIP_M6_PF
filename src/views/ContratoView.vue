<template>
    <div>
        <h5>Contrato</h5>
        <tabs>
            <template v-slot:lista>
                <search placeholder="Buscar Contrato" @searchtext="searchFx($event)"></search>
                
                <table class="highlight responsive-table card">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Contrato</th>
                            <th>Fecha de Vencimiento</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in items.lstContratoEmpresa">
                            <td>{{ item.iD_TipoContrato }}</td>
                            <td>{{ item.nroContrato }}</td>
                            <td>{{ item.fechaVencimiento }}</td>
                            
                        </tr>
                    </tbody>
                </table>

            </template>
            <template v-slot:nuevo>
                <div class="row card p-2" style="max-width: 650px;">
                    <h6>Formulario Contrato</h6>
                    <form class="col s12" @submit.prevent="saveProduct()">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="nombreEmpresa" type="text" class="validate" v-model="payload.nombreEmpresa">
                                <label for="nombreEmpresa"> Tipo</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="nombreResponsable" type="number" class="validate" v-model="payload.nombreResponsable">
                                <label for="nombreResponsable"> Contrato</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="direccion" type="text" class="validate" v-model="payload.direccion">
                                <label for="direccion"> Fecha de Vencimiento</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                                    <i class="material-icons right">enviar</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </template>
        </tabs>
    </div>
    <Footer> </Footer>
</template>
  
<script>

import Tabs from '@/components/Tabs.vue';
import Search from '@/components/Search.vue';
import FilterItem from '@/components/FilterItem.vue';
import FilterGroup from '@/components/FilterGroup.vue';
import Footer from '@/components/Footer.vue';
export default {
    name: 'Empresa',
    data() {
        const api = "https://proveedores.minerasancristobal.com:444/ApiTransporteLogistica/api";
        return {
            api,
            items: [],
            toSearch: '',
            toFilter: '',
            payload: {
                nombreEmpresa: '',
                responsableEmpresa: null,
                direccion: null
            }
        }
    },
    methods: {

        onFilterFx(field, event) {
            if (event === '') {
                this.toFilter = '';
            } else {
                this.toFilter = '&' + field + '=' + event;
            }
            this.getItems();
        },
        getItems() {
            this.axios({
                method: 'get',
                url: this.api + '/ContratoEmpresa/Get' 
            })
                .then((response) => {
                    this.items = response.data;
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
        },
      
        
        saveProduct() {
            this.axios({
                method: 'post',
                url: this.api + '/ContratoEmpresa/Add',
                data: this.payload
            })
                .then((response) => {
                    this.payload = {
                        name: '',
                        price: null,
                        categoriesId: null
                    };
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    this.getItems();

                    console.log(response);
                });
        },
        searchFx(event) {
            if (event === "") {
                this.toSearch = '';
            } else {
                this.toSearch = '&q=' + event;
            }
            this.getItems();
            console.log('search', event);
        },
        eliminarItem(id){
            if(confirm("Esta seguro que desea eliminar.")){
            this.axios({
                method: 'delete',
                url: this.api + '/EmpresaTransportista/Delete?id=' + id
            })
                .then((response) => {
                    this.getItems();
                });
            }
        }
    },
    mounted() {
        this.getItems();
    },
    components: {
        Tabs, Search, FilterItem, FilterGroup, Footer
    },
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style>

</style>