#pragma clang diagnostic ignored "-Wmissing-prototypes"
#pragma clang diagnostic ignored "-Wmissing-braces"

#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

template<typename T, size_t Num>
struct spvUnsafeArray
{
    T elements[Num ? Num : 1];
    
    thread T& operator [] (size_t pos) thread
    {
        return elements[pos];
    }
    constexpr const thread T& operator [] (size_t pos) const thread
    {
        return elements[pos];
    }
    
    device T& operator [] (size_t pos) device
    {
        return elements[pos];
    }
    constexpr const device T& operator [] (size_t pos) const device
    {
        return elements[pos];
    }
    
    constexpr const constant T& operator [] (size_t pos) const constant
    {
        return elements[pos];
    }
    
    threadgroup T& operator [] (size_t pos) threadgroup
    {
        return elements[pos];
    }
    constexpr const threadgroup T& operator [] (size_t pos) const threadgroup
    {
        return elements[pos];
    }
};

struct UBO
{
    float4 v;
};

struct spvDescriptorSetBuffer0
{
    array<texture2d<float>, 10000> uSamplers [[id(0)]];
    array<sampler, 10000> uSamplersSmplr [[id(10000)]];
};

struct spvDescriptorSetBuffer1
{
    spvUnsafeArray<constant thread UBO*, 10000> vs [[id(0)]];
};

struct spvDescriptorSetBuffer2
{
    texture2d<float> uSampler [[id(0)]];
    sampler uSamplerSmplr [[id(1)]];
};

struct main0_out
{
    float4 FragColor [[color(0)]];
};

struct main0_in
{
    float2 vUV [[user(locn0)]];
};

fragment main0_out main0(main0_in in [[stage_in]], const device spvDescriptorSetBuffer0& spvDescriptorSet0 [[buffer(0)]], const device spvDescriptorSetBuffer1& spvDescriptorSet1 [[buffer(1)]], constant spvDescriptorSetBuffer2& spvDescriptorSet2 [[buffer(2)]])
{
    main0_out out = {};
    out.FragColor = (spvDescriptorSet0.uSamplers[9999].sample(spvDescriptorSet0.uSamplersSmplr[9999], in.vUV) + spvDescriptorSet1.vs[5000]->v) + spvDescriptorSet2.uSampler.sample(spvDescriptorSet2.uSamplerSmplr, in.vUV);
    return out;
}

