
#include <iostream>
#include <iomanip>
#include <chrono>
#include <cmath> // For floating point division optimizations

double calculate(int iterations, int param1, int param2) {
    double result = 1.0;
    for (int i = 1; i <= iterations; ++i) {
        int j = i * param1 - param2;
        result -= static_cast<double>(1) / j;
        j = i * param1 + param2;
        result += static_cast<double>(1) / j;
    }
    return result;
}

int main() {
    auto start_time = std::chrono::high_resolution_clock::now();
    double result = calculate(100000000, 4, 1) * 4;
    auto end_time = std::chrono::high_resolution_clock::now();

    std::chrono::duration<double> elapsed = end_time - start_time;
    
    std::cout << std::fixed << std::setprecision(12)
              << "Result: " << result << "\n"
              << "Execution Time: " << elapsed.count() << " seconds\n";

    return 0;
}
