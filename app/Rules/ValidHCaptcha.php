<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidHCaptcha implements ValidationRule {
    /**
     * Indicates whether the rule should be implicit.
     *
     * @var bool
     */
    public $implicit = true;

    /**
     * Run the validation rule.
     *
     * @param  Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (!$this->isValidHCaptcha($value)) {
            $fail($this->message());
            return;
        }
    }

    public function message() {
        return 'CAPTCHA Inválido. Tenés que probar que sos un humano.';
    }

    /**
     * Fuente: https://serversideup.net/laravel-hcaptcha-custom-validation-rule/
     */
    protected function isValidHCaptcha(mixed $value): bool {
        $base_url = 'https://hcaptcha.com/siteverify';

        $verify = curl_init();
        curl_setopt($verify, CURLOPT_URL, $base_url);
        curl_setopt($verify, CURLOPT_POST, true);
        curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query([
            'secret' => env('HCAPTCHA_SECRET'),
            'response' => $value
        ]));
        curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($verify);
        $responseData = json_decode($response);

        return $responseData->success;
    }
}
