<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('fromCountry');
            $table->string('fromAddress');
            $table->string('fromCity');
            $table->string('fromState');
            $table->string('fromZipcode');

            $table->string('fromName');
            $table->string('fromCompany');
            $table->string('fromEmail');
            $table->string('fromPhonetype');
            $table->string('fromPhonecode');
            $table->string('fromPhonenumber');
            $table->string('fromPhoneext');

            $table->string('toCountry');
            $table->string('toAddress');
            $table->string('toCity');
            $table->string('toState');
            $table->string('toZipcode');

            $table->string('toName');
            $table->string('toCompany');
            $table->string('toEmail');
            $table->string('toPhonetype');
            $table->string('toPhonecode');
            $table->string('toPhonenumber');
            $table->string('toPhoneext')->nullable();
            
//            $table->string('itemType');
//            $table->string('items');
//            $table->string('packaging');
            
//            $this->string('itemType')->nullable();
//            $this->string('items')->nullable();
//            $this->string('packaging')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
