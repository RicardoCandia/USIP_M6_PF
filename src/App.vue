<template>
  <div class="empresa"><a href="#" class="brand-logo center"><i class="material-icons">cloud</i>Minera San Cristóbal
      S.A.</a></div>
  <nav>
    <div class="nav-wrapper">
      <router-link to="/">Inicio</router-link> |
      <router-link to="/empresa">Empresa</router-link> |
      <router-link to="/conductor">Conductor</router-link> |
      <router-link to="/vehiculo">Vehiculo</router-link> |
      <router-link to="/contrato">Contrato</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style></style>
