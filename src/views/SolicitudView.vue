<template>
    <div>
        <h5>Solicitud</h5>
        <tabs>
            <template v-slot:lista>
                <search placeholder="Buscar Solicitud" @searchtext="searchFx($event)"></search>
                
                <table class="highlight responsive-table card">
                    <thead>
                        <tr>
                            <th>Orden</th>
                            <th>Proveedor</th>
                            <th>Descripción</th>
                            <th>Seguimiento</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in items.lstSolicitud">
                            <td>{{ item.nroOI }}</td>
                            <td>{{ item.proveedor }}</td>
                            <td>{{ item.descripcion }}</td>
                            <td>
                                <router-link :to="'/Seguimiento/'+item.iD_Solicitud">
                                    <i class="material-icons">check</i>
                                </router-link>
                                    <i class="material-icons" style="color: red" @click="eliminarItem(item.iD_Solicitud)">delete_forever</i>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </template>
            <template v-slot:nuevo>
                <div class="row card p-2" style="max-width: 650px;">
                    <h6>Formulario Solicitud</h6>
                    <form class="col s12" @submit.prevent="saveProduct()">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="nombreEmpresa" type="text" class="validate" v-model="payload.nombreEmpresa">
                                <label for="nombreEmpresa"> Orden</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="nombreResponsable" type="number" class="validate" v-model="payload.nombreResponsable">
                                <label for="nombreResponsable"> Proveedor</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="direccion" type="text" class="validate" v-model="payload.direccion">
                                <label for="direccion"> Descripción</label>
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
                url: this.api + '/Solicitud/Get' 
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
                url: this.api + '/Solicitud/Add',
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